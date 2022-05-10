const app = require('../app');
const supertest = require('supertest');

describe('Register route', () => {
    it('should return a 200 response', async () => {
        const response = await supertest(app).get('/register');
        expect(response.statusCode).toBe(200);
    });
    it('should return a html response with form', async () => {
        const response = await supertest(app).get('/register');
        expect(response.text).toContain('<form>');
        expect(response.text).toContain('<button type="submit">');
    });
    it('should register the user', async () => {
        const response = await supertest(app).post('/register').send({
            username: 'test',
            password: 'test'
        });
        expect(response.statusCode).toBe(302); // redirect to other url
    });
});
