import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';
import prisma from '../../utils/connect.js';
import { app } from '../../index.js';


Given('a bookAdmin/Non-bookAdmin is logged in with ID {int}', async function (ownerId) {
    const user = await prisma.user.findUnique({ where: { id: ownerId } });
    const response = await request(app)
        .post('/api/auth/login')
        .send({ email: user.email, password: '123456' });
    this.authToken = response.headers['set-cookie'].find(cookie => cookie.startsWith('token=')).split(';')[0].split('=')[1];
});



When('the bookAdmin/Non-bookAdmin tries to see all books', async function () {
    this.response = await request(app)
        .get(`/api/book/all-books`)
        .set('Cookie', [`token=${this.authToken}`]);
});


Then('a bookAdmin/Non-bookAdmin expect {string}', async function (expected) {
    if (expected === 'success') {
        assert.strictEqual(this.response.status, 201);
    } else if (expected === 'error') {
        assert.strictEqual(this.response.status, 403);
        assert(this.response.body.hasOwnProperty('message'));
        assert.strictEqual(this.response.body.message, 'You do not have permission to get all books.');
    }
});