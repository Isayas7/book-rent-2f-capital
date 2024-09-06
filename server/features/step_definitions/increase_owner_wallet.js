import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';
import prisma from '../../utils/connect.js';
import { app } from '../../index.js';

let initialWallet;
Given('a customer with ID {int} is logged in', async function (customerId) {
    const user = await prisma.user.findUnique({ where: { id: customerId } });
    const response = await request(app)
        .post('/api/auth/login')
        .send({ email: user.email, password: '123456' });
    this.authToken = response.headers['set-cookie'].find(cookie => cookie.startsWith('token=')).split(';')[0].split('=')[1];
});

Given('an owner with ID {int} has a book with ID {int}', async function (ownerId, bookId) {
    this.ownerId = ownerId;
    this.bookId = bookId;
    const book = await prisma.book.findUnique({
        where: { id: bookId },
        include: { owner: true }
    });
    initialWallet = book.owner.wallet;
    assert(book && book.owner.id === ownerId, `Book with ID ${bookId} is owned by user with ID ${ownerId}`);
});

Given('the book\'s rent price is {float}', async function (rentPrice) {
    const book = await prisma.book.findUnique({ where: { id: this.bookId } });
    assert.strictEqual(book.rentPrice, rentPrice);
});

When('the customer rents the book with ID {int}', async function (bookId) {
    this.response = await request(app)
        .post(`/api/rental/rent/${bookId}`)
        .send({ quantity: 1 })
        .set('Cookie', [`token=${this.authToken}`]);
});

Then('the owner\'s wallet should be increased by {float}', async function (amount) {
    const owner = await prisma.user.findUnique({ where: { id: this.ownerId } });
    const expectedBalance = parseFloat((initialWallet + amount).toFixed(2));
    assert.strictEqual(owner.wallet, expectedBalance);
    initialWallet = owner.wallet;
});

When('the customer tries to rent the book with ID {int} but fails', async function (bookId) {
    this.response = await request(app)
        .post(`/api/rental/rent/${bookId}`)
        .send({ quantity: 0 })
        .set('Cookie', [`token=${this.authToken}`]);
    assert(this.response.status !== 201, 'Rental should have failed but succeeded');
});

Then('the owner\'s wallet should not be increased', async function () {
    const updatedOwner = await prisma.user.findUnique({ where: { id: this.ownerId } });
    assert.strictEqual(updatedOwner.wallet, initialWallet);
});

