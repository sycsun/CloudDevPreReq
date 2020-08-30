'use strict';
const supertest = require('supertest');
const app = require('../src/file-server');

describe('File server', () => {
  
  it('can efficiently handle parallel requests', () => {
    const client = supertest(app);
    const startTime = Date.now();

    const requests = [];
    for (let i = 0; i < 10; i++) {
        requests.push(client.get('/large-file.txt').expect(200));
    }

    return Promise.all(requests).then(() => {
        console.log(`Requests finished after ${Date.now() - startTime}ms`);
    });
  });
});
