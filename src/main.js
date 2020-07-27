'use strict';

const Pool = require('pg').Pool;
const URI = 'postgres://postgres@localhost:5432/postgres';
const Paymentgateway = require('./payment-gateway');
const pool = new Pool({connectionString: URI});
const chargeUser = require('./charge-user');

try {
  const paymentGateway = new Paymentgateway([
    {
      id: 123,
      name: 'John Doe',
      balance: 2500
    }
  ]);
  chargeUser(1, 500, paymentGateway, pool, (err, response) => {
    if (err) {
      throw err;
    } else {
      console.log('Successfully charged user');
    }
  });
} catch (err) {
  console.error(err);
}
