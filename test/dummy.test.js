const assert = require('assert');
const DummyServer = require('../src/dummy-server');

describe('Dummy Server', () => {
  let server;

  before(() => {
    server = new DummyServer([
      {
        id: 1,
        name: 'John Doe',
        balance: 3000
      },
      {
        id: 2,
        name: 'Jane Doe',
        balance: 250
      }
    ]);
  });

  it('can charge an amount', (done) => {
    const userId = 1;
    const amount = 100;
    server.charge(userId, amount, (err, value) => {
      assert.equal(err, null);
      assert.deepEqual({
        newBalance: 2900
      }, value);
      done();
    });
  });

  it('Error in case user was not found', (done) => {
    const userId = -1;
    const amount = 100;
    server.charge(userId, amount, (err, value) => {
      assert.ok(err);
      assert.ok(!value);
      assert.equal('User not found!', err.message);
      done();
    });
  });

  it('Error if amount exceeds users balance ', (done) => {
    const userId = 2;
    const amount = 300;
    server.charge(userId, amount, (err, value) => {
      assert.ok(err);
      assert.ok(!value);
      assert.equal('Amount exceeds users balance.', err.message);
      done();
    });
  });
});