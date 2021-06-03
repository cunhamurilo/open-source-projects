const controller = require("./src/database/controllers/data.controller");

const app = require('./src/app');
const supertest = require("supertest");
const request = supertest(app)

describe('test get all data', () => {
    it('should be an instance of function', () => {
        expect(controller.getAllData).toBeInstanceOf(Object)
    })

    it('works with async/await', async () => {
        const response = await controller.getAllData();
        expect(response).toBe(undefined);    
    })
})

describe('test get movie info', () => {
    it('should be an instance of function', () => {
        expect(controller.getMovieInformation).toBeInstanceOf(Object)
    })

    it('works with async/await', async () => {
        await request.post('/api/infodata').send({ id: '337404', type: 'movie'})
                                                .set('Accept', 'application/json')
                                                .expect('Content-Type', /json/)
                                                .expect(200)
    })
})

describe('test get movies by type ', () => {
    it('should be an instance of function', () => {
        expect(controller.getDataByType).toBeInstanceOf(Object)
    })

    it('movie ', async () => {
        await request.post('/api/data').send({ type: 'movie'})
                                                .set('Accept', 'application/json')
                                                .expect('Content-Type', /json/)
                                                .expect(200)
    })

    it('tv ', async () => {
        await request.post('/api/data').send({ type: 'tv'})
                                                .set('Accept', 'application/json')
                                                .expect('Content-Type', /json/)
                                                .expect(200)
    })
})

describe('test get movies by search ', () => {
    it('should be an instance of function', () => {
        expect(controller.getSearchData).toBeInstanceOf(Object)
    })

    it('movie ', async () => {
        await request.post('/api/searchdata').send({ type: 'movie', title: "avenger"})
                                                .set('Accept', 'application/json')
                                                .expect('Content-Type', /json/)
                                                .expect(200)
    })

    it('tv ', async () => {
        await request.post('/api/searchdata').send({ type: 'tv', title: "the walking dead"})
                                                .set('Accept', 'application/json')
                                                .expect('Content-Type', /json/)
                                                .expect(200)
    })
})