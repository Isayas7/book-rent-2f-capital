import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';
import prisma from '../../utils/connect.js';
import { rentBook } from '../../controllers/rent.controller.js';
import { app } from '../../index.js';


Given('a customer is logged in with ID {int}', async function (customerId) {
    const user = await prisma.user.findUnique({ where: { id: customerId } });
    const response = await request(app)
        .post('/api/auth/login')
        .send({ email: user.email, password: '123456' });
    this.authToken = response.headers['set-cookie'].find(cookie => cookie.startsWith('token=')).split(';')[0].split('=')[1];
});


Given('a book with ID {int} is approved', async function (bookId) {
    this.book = await prisma.book.findUnique({ where: { id: bookId } });
    assert.strictEqual(this.book.status, 'APPROVED');
});

Given('a book with ID {int} is not approved', async function (bookId) {
    this.book = await prisma.book.findUnique({ where: { id: bookId } });
    assert.strictEqual(this.book.status, 'APPROVE');
});

Given('the owner with ID {int} of the book is approved', async function (ownerId) {
    this.owner = await prisma.user.findUnique({ where: { id: ownerId } });
    assert.strictEqual(this.owner.status, 'APPROVED');
});

// Given('the owner with ID {int} of the book is not approved', async function (ownerId) {
//     this.owner = await prisma.user.findUnique({ where: { id: ownerId } });
//     assert.strictEqual(this.owner.status, 'APPROVE');
// });

When('a customer tries to rent the book with ID {int}', async function (bookId) {
    this.response = await request(app)
        .post(`/api/rental/rent/${bookId}`)
        .send({ quantity: 1 })
        .set('Cookie', [`token=${this.authToken}`]);
});

Then('the customer should expect {string}', function (expectedResult) {
    if (expectedResult === 'success') {
        assert.strictEqual(this.response.status, 201);
    } else if (expectedResult === 'error') {
        assert([400, 404].includes(this.response.status));
        assert(this.response.body.hasOwnProperty('message'));
        assert.strictEqual(this.response.body.message, 'Book or owner not approved.');
    }
});
