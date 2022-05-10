const app = require('../app');
const supertest = require('supertest');

describe('Login route', () => {
    it('should return a 200 response', async () => {
        const response = await supertest(app).get('/login');
        expect(response.statusCode).toBe(200);
    });
    it('should return a html response with form', async () => {
        const response = await supertest(app).get('/login');
        expect(response.text).toContain('<form>');
        expect(response.text).toContain('<button type="submit">');
    });
    it('should login the user', async () => {
        const response = await supertest(app).post('/login').send({
            username: 'test',
            password: 'test'
        });
        expect(response.statusCode).toBe(302); // redirect to other url
    });
});