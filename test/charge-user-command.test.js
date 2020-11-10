'use strict';

const assert = require('assert');
const PaymentGateway = require('../src/payment-gateway');
const Pool = require('pg').Pool;
const ChargeUserCommand = require('../src/charge-user-command');

describe('Charge user command', () => {
  let chargeUserCommand;
  let paymentGateway;
  let pool;

  before((done) => {
    pool = new Pool({ connectionString: 'postgres://postgres@localhost:5432/postgres' });
    pool.query('DELETE FROM "mapping"', () => {
      pool.query(`INSERT INTO "mapping" ("id", "gateway_id") 
                  VALUES('johndoe', 'doe_john'), ('janeroe', 'roe_jane')`, () => {
        done();
      });
    });
    paymentGateway = new PaymentGateway({ 'doe_john': { balance: 100 } });
    chargeUserCommand = new ChargeUserCommand(paymentGateway, pool);
  });

  after(() => pool.end());

  it('can charge an amount', (done) => {
    chargeUserCommand.execute('johndoe', 100, (err, value) => {
      assert.strictEqual(err, null);
      assert.deepStrictEqual({ newBalance: 0 }, value);
      done();
    });
  });

  it('fails if user was not found in database', (done) => {
    chargeUserCommand.execute('alcapone', 100, (err, value) => {
      assert.strictEqual(true, err instanceof ChargeUserCommand.UserNotFoundError);
      assert.ok(!value);
      done();
    });
  });

  it('propagates payment gateway errors', (done) => {
    chargeUserCommand.execute('johndoe', 101, (err, value) => {
      assert.strictEqual(true, err instanceof PaymentGateway.OverdraftError);
      assert.ok(!value);
      done();
    });
  });
});
