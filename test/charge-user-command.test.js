const assert = require('assert');
const PaymentGateway = require('../src/payment-gateway');
const Pool = require('pg').Pool;
const ChargeUserCommand = require('../src/charge-user-command');

describe('Charge user command', () => {
  let chargeUserCommand;
  let paymentGateway;
  let pool;

  before(() => {
    pool = new Pool({ connectionString: 'postgres://postgres@localhost:5432/postgres' });
    paymentGateway = new PaymentGateway({ 'doe_john': { balance: 100 } });
    chargeUserCommand = new ChargeUserCommand(paymentGateway, pool);
  });

  after(() => pool.end());

  it('can charge an amount', (done) => {
    chargeUserCommand.execute('johndoe', 100, (err, value) => {
      assert.equal(err, null);
      assert.deepEqual({ newBalance: 0 }, value);
      done();
    });
  });

  it('fails if user was not found in database', (done) => {
    chargeUserCommand.execute('alcapone', 100, (err, value) => {
      assert.equal(true, err instanceof ChargeUserCommand.UserNotFoundError);
      assert.ok(!value);
      done();
    });
  });

  it('propagates payment gateway errors', (done) => {
    chargeUserCommand.execute('johndoe', 101, (err, value) => {
      assert.equal(true, err instanceof PaymentGateway.OverdraftError);
      assert.ok(!value);
      done();
    });
  });
});
