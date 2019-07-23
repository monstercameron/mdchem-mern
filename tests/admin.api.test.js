const request = require('supertest');
const app = require('../app')
describe('Testing Admin API', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/api/admin').then((response) => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })
  test('It should response the POST method', (done) => {
    request(app).post('/api/admin').then((response) => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })
})