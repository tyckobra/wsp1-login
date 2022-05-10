const app = require('../app');
const supertest = require('supertest');

describe('Auth route', () => {
    it('should return a 200 response', async () => {
        const response = await supertest(app).post('/logout');
        expect(response.statusCode).toBe(200);
    });
});