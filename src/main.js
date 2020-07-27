'use strict';

const Pool = require('pg').Pool;
const URI = 'postgres://postgres@localhost:5432/postgres';
const Paymentgateway = require('./payment-gateway');
const paymentGateway = new Paymentgateway([
  {
    id: 123,
    name: 'John Doe',
    balance: 2500
  }
]);

const pool = new Pool({connectionString: URI});

const chargeUser = (userId, amount) => {
  pool.connect((err, client) => {
    if (err) {
      console.error(err);
      throw new Error('Failed to connect to Databse');
    }

    client.query('SELECT * FROM users WHERE id = $1', [userId], (err, result) => {
      if (err) {
        throw new Error('Failed to query user');
      }

      const dbEntry = result.rows[0];
      paymentGateway.charge(dbEntry.gateway_id, amount, (err, response) => {
        if (err) {
          throw err;
        }
        else {
          console.log('Charged successfully')
        }
      });
    });
  });
};

try {
  chargeUser(1, 500);
} catch (err) {
  console.error(err);
}
