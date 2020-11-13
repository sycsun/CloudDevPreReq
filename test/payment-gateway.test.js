'use strict';

const assert = require('assert');
const PaymentGateway = require('../src/payment-gateway');

describe('Payment Gateway', () => {
  let paymentGateway;

  before(() => {
    paymentGateway = new PaymentGateway({
      'doe_john': { balance: 100 },
      'roe_jane': { balance: 200 }
    });
  });

  it('can charge an amount', (done) => {
    paymentGateway.charge('doe_john', 100, (err, value) => {
      assert.strictEqual(err, null);
      assert.deepStrictEqual({ newBalance: 0 }, value);
      done();
    });
  });

  it('fails if users does not have sufficient money ', (done) => {
    paymentGateway.charge('roe_jane', 201, (err, value) => {
      assert.ok(!value);
      assert.strictEqual(err instanceof PaymentGateway.OverdraftError, true);
      done();
    });
  });
});
