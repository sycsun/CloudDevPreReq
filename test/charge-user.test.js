const assert = require('assert');
const PaymentGateway = require('../src/payment-gateway');
const Pool = require('pg').Pool;
const chargeUser = require('../src/charge-user');

describe('Charge user', () => {
  let paymentGateway;
  let pool;

  before(() => {
    pool = new Pool({connectionString: 'postgres://postgres@localhost:5432/postgres'});
    paymentGateway = new PaymentGateway([{
      id: 123,
      name: 'John Doe',
      balance: 3000
    }]);
  });

  it('can charge an amount', (done) => {
    const userId = 1;
    const amount = 100;
    chargeUser(userId, amount, paymentGateway, pool, (err, value) => {
      assert.equal(err, null);
      assert.deepEqual({
        newBalance: 2900
      }, value);
      done();
    });
  });

  it('error if user was not found in database', (done) => {
    const userId = 999;
    const amount = 100;
    chargeUser(userId, amount, paymentGateway, pool, (err, value) => {
      assert.ok(err);
      assert.ok(!value);
      assert.equal('No user found in database', err.message);
      done();
    });
  });

  it('payment gateway errors are propagated', (done) => {
    const userId = 1;
    const amount = 3100;
    chargeUser(userId, amount, paymentGateway, pool, (err, value) => {
      assert.ok(err);
      assert.ok(!value);
      assert.equal('Payment gateway error', err.message);
      done();
    });
  });
});
