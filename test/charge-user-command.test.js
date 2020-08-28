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
    paymentGateway = new PaymentGateway([{
      id: 123,
      name: 'John Doe',
      balance: 3000
    }]);
    chargeUserCommand = new ChargeUserCommand(paymentGateway, pool);
  });

  after(() => pool.end());

  it('can charge an amount', (done) => {
    const userId = 1;
    const amount = 100;
    chargeUserCommand.execute(userId, amount, (err, value) => {
      assert.equal(err, null);
      assert.deepEqual({
        newBalance: 2900
      }, value);
      done();
    });
  });

  it('fails if user was not found in database', (done) => {
    const userId = 999;
    const amount = 100;
    chargeUserCommand.execute(userId, amount, (err, value) => {
      assert.equal(true, err instanceof ChargeUserCommand.UserNotFoundError);
      assert.ok(!value);
      done();
    });
  });

  it('propagates payment gateway errors', (done) => {
    const userId = 1;
    const amount = 3100;
    chargeUserCommand.execute(userId, amount, (err, value) => {
      assert.equal(true, err instanceof PaymentGateway.PaymentGatewayError);
      assert.ok(!value);
      done();
    });
  });
});
