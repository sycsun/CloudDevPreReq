'use strict';

const Pool = require('pg').Pool;
const URI = 'postgres://postgres@localhost:5432/postgres';
const Paymentgateway = require('./payment-gateway');
const { ChargeUserCommand } = require('./charge-user-command');

try {
  const pool = new Pool({connectionString: URI});
  const paymentGateway = new Paymentgateway([
    {
      id: 123,
      name: 'John Doe',
      balance: 2500
    }
  ]);
  const chargeUserCommand = new ChargeUserCommand(paymentGateway, pool);
  chargeUserCommand.execute(1, 500, (err, response) => {
    if (err) {
      pool.end();
      throw err;
    } else {
      console.log('Successfully charged user');
      pool.end();
    }
  });
} catch (err) {
  console.error(err);
}
