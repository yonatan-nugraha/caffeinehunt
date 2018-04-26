const request = require('supertest');
const app = require('../src/app');
const mongodb = require('../src/mongodb');
const config = require('../config/default');

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('Test the restaurant path', () => {
  beforeAll(() => {
    mongodb.connect();
  });
  afterAll((done) => {
    mongodb.disconnect(done);
  });
  test('It should response the GET method', () => {
    return request(app).get('/restaurants').then((response) => {
      expect(response.statusCode).toBe(200);
    });
  });
});
