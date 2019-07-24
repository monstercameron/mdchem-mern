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
  })
  afterAll(async () => {
    await db.close()
  })
  test('Registering Admin', (done) => {
    request(app)
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
      .expect(res => {
        //console.log(res.body.results)
      })
      .expect(200, {
        results: {
          message: `Admin test@test.com saved`
        }
      }, done)
  })
  test('Logging In Admin', (done) => {
    request(app)
      .post('/api/auth/login/admin')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .then(res => {
        const {
          message,
          token: jwt
        } = res.body.results
        //console.log(res.body.results)
        token = jwt
        expect(message)
          .toEqual(`Successfully Authenticated.`)
        done()
      })
  })
  test('Checking Token', (done) => {
    request(app)
      .get(`/api/auth/check?token=${token}`)
      .then(res => {
        //console.log(res.body.results)
        const {
          message
        } = res.body.results
        expect(res.body.results.message)
          .toEqual(false)
        done()
      })
  })
  test('Registering Student', (done) => {
    request(app)
      .post('/api/auth/register/student')
      .send({
        email: 'test@test.com',
        password: 'password',
        role: 'student',
        recovery: {
          question: 'test question'
        },
        meta: {
          group: 'test group'
        }
      })
      .expect(res => {
        //console.log(res.body.result)
      })
      .expect(200, {
        results: {
          message: `Student test@test.com saved`
        }
      }, done)
  })
  test('Logging In Student', (done) => {
    request(app)
      .post('/api/auth/login/student')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .then(res => {
        const {
          message,
          token: jwt
        } = res.body.results
        //console.log(res.body.results)
        token = jwt
        expect(message)
          .toEqual(`Successfully Authenticated.`)
        done()
      })
  })
  test('Checking Student Token', (done) => {
    request(app)
      .get(`/api/auth/check?token=${token}`)
      .then(res => {
        //console.log(res.body.results)
        const {
          message
        } = res.body.results
        expect(res.body.results.message)
          .toEqual(false)
        done()
      })
  })
})