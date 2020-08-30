'use strict';
const supertest = require('supertest');
const app = require('../src/server');

describe('Server', function () {

  it('does not block', function (done) {
    const client = supertest(app);

    //Send a request that should take a while to respond.
    //We don't care if or when it finishes!
    client.post('/long-running-operation').expect(200).then(() => { });

    //Wait a bit to make sure the long running operation starts processing.
    //Then send a request that should be responded fast.
    //If the long-running operation does not block, we should get the response quickly.
    //After we got the response, we're done with the tests.
    //This stops the server and cancels the long-running operation.
    setTimeout(() => {
      client.get('/greeting').expect(200).then(() => done());
    }, 10);
  });
});
