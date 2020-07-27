'use strict';

const fs = require('fs');
const Pool = require('pg').Pool;
const URI = 'postgres://postgres@localhost:5432/postgres';
const Paymentgateway = require('./payment-gateway');
const paymentGateway = new Paymentgateway([
  {
    id: 123,
    name: 'John Doe',
    balance: 2500
  },
  {
    id: 456,
    name: 'Jane Doe',
    balance: 300
  }
]);

const pool = new Pool({connectionString: URI});

const chargeUser = (userId, amount) => {
  fs.readFile('src/file.csv', 'utf-8', (err, data) => {
    if (err) {
      throw new Error('Failed to read file');
    }
    const users = data.split('\n').slice(1).map((line) => {
      line = line.split(';');
      return {
        id: parseInt(line[0]),
        amount: parseInt(line[1])
      };
    });

    const [user] = users.filter((user) => user.id === userId)
    if (!user) {
      throw new Error('Specified user has no file entry.');
    }

    pool.connect((err, client) => {
      if (err) {
        console.error(err);
        throw new Error('Failed to connect to Databse');
      }

      client.query('SELECT * FROM users WHERE id = $1', [user.id], (err, result) => {
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
  });
}

try {
  chargeUser(1, 500);
} catch (err) {
  console.error(err);
}
