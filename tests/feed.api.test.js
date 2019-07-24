const request = require('supertest');
const app = require('../app')
describe('Testing Auth APIs', () => {
    const db = require('../managers/Database')
    let token
    beforeAll(async () => {
        db.dropCollection('admin', (err, result) => {
            //console.log(`Admin collection dropped`)
        })
        db.dropCollection('students', (err, result) => {
            //console.log(`Student collection dropped`)
        })
        await request(app)
            .post('/api/auth/register/admin')
            .send({
                name: 'test user',
                email: 'test@test.com',
                role: 'admin',
                password: 'password',
                recovery: {
                    question: 'test question',
                    answer: 'test'
                }
            })
            .then(async res => {
                //console.log(res.body.results)
                await request(app)
                    .post('/api/auth/login/admin')
                    .send({
                        email: 'test@test.com',
                        password: 'password'
                    })
                    .then(res => {
                        //console.log(res.body.results)
                        token = res.body.results.token
                    })
            })
    })
    afterAll(async () => {
        await db.close()
    })
    test('Creating New Feed Item POST', (done) => {
        request(app)
            .post('/api/feed/')
            .set('Authorization', token)
            .send({
                date: new Date().toUTCString(),
                sender: 'test body',
                message: 'test body'
            })
            .then(res => {
                console.log(res)
                const {
                    message
                } = res.body.results
                expect(message)
                    .toEqual(`news item saved`)
                done()
            })
    })
    // test('Requesting Feed Item GET', (done) => {
    //     request(app)
    //         .post('/api/feed/')
    //         .send({})
    //         .then(res => {
    //             expect()
    //                 .toEqual()
    //             done()
    //         })
    // })
    // test('Patching Feed Item PATCH', (done) => {
    //     request(app)
    //         .post('/api/feed/')
    //         .send({})
    //         .then(res => {
    //             expect()
    //                 .toEqual()
    //             done()
    //         })
    // })
    // test('Deleting Feed Item DELETE', (done) => {
    //     request(app)
    //         .post('/api/feed/')
    //         .send({})
    //         .then(res => {
    //             expect()
    //                 .toEqual()
    //             done()
    //         })
    // })
})