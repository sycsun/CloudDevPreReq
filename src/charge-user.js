'use strict';

const chargeUser = (userId, amount, paymentGateway, pool, callback) => {
  pool.connect((err, client) => {
    if (err) {
      return callback(new Error('Failed to connect to database'));
    }

    client.query('SELECT * FROM users WHERE id = $1', [userId], (err, result) => {
      if (err) {
        return callback(new Error('Query failed'));
      }

      if (!result.rows[0]) {
        return callback(new Error('No user found in database'));
      }
      const dbEntry = result.rows[0];
      paymentGateway.charge(dbEntry.gateway_id, amount, (err, response) => {
        if (err) {
          return callback(new Error('Payment gateway error'));
        }
        client.end(() => {
          return callback(null, response);
        });
      });
    });
  });
};

module.exports = chargeUser;
