import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';
import prisma from '../../utils/connect.js';
import { app } from '../../index.js';


Given('a user is logged in with ID {int}', async function (ownerId) {
    const user = await prisma.user.findUnique({ where: { id: ownerId } });
    const response = await request(app)
        .post('/api/auth/login')
        .send({ email: user.email, password: '123456' });
    this.authToken = response.headers['set-cookie'].find(cookie => cookie.startsWith('token=')).split(';')[0].split('=')[1];
});



Given('a user with ID {int} owns a book with ID {int}', async function (ownerId, bookId) {
    this.ownerId = ownerId;
    this.bookId = bookId;
    // Ensure the book exists and is owned by the user
    const book = await prisma.book.findUnique({
        where: { id: bookId },
    });
    assert(book && book.ownerId === ownerId, `Book with ID ${bookId} is not owned by user with ID ${ownerId}`);
});


Given('a user with ID {int} does not own a book with ID {int}', async function (ownerId, bookId) {
    this.nonOwnerId = ownerId;
    this.bookId = bookId;
    // Ensure the book exists but is not owned by the user
    const book = await prisma.book.findUnique({
        where: { id: bookId },
    });
    assert(book && book.ownerId !== ownerId, `Book with ID ${bookId} is owned by user with ID ${ownerId}`);
});



When('the user tries to update the book with ID {int}', async function (bookId) {
    this.response = await request(app)
        .put(`/api/book/${bookId}`)
        .send({ bookName: 'Updated Title', author: 'Updated Author', category: 'Updated Category', quantity: 10, rentPrice: 10.0 })
        .set('Cookie', [`token=${this.authToken}`]);
});


Then('a user expect {string}', async function (expected) {
    if (expected === 'success') {
        assert.strictEqual(this.response.status, 201);
        const updatedBook = await prisma.book.findUnique({
            where: { id: this.bookId }
        });
        assert.strictEqual(updatedBook.bookName, 'Updated Title');
    } else if (expected === 'error') {
        assert.strictEqual(this.response.status, 403);
        assert(this.response.body.hasOwnProperty('message'));
        assert.strictEqual(this.response.body.message, 'You are not allowed to edit this book');
    }
});

