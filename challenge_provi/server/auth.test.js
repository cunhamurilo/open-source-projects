const controller = require("./src/database/controllers/auth.controller");

const app = require('./src/app');
const supertest = require("supertest");
const request = supertest(app)

describe('test get auth', () => {
    it('should be an instance of function', () => {
        expect(controller.signin).toBeInstanceOf(Object)
    })

    it('works with async/await', async () => {
        await request.post('/api/auth/signin').send({ username: 'teste', password: '12345678'})
                                                .set('Accept', 'application/json')
                                                .expect('Content-Type', /json/)
                                                .expect(200)
    })
})
