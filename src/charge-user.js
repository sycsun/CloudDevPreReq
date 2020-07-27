'use strict';

class UserNotFoundError extends Error {}
class PaymentGatewayError extends Error {}

const chargeUser = (userId, amount, paymentGateway, pool, callback) => {
  pool.connect((err, client) => {
    if (err) {
      return callback(err);
    }

    client.query('SELECT * FROM users WHERE id = $1', [userId], (err, result) => {
      if (err) {
        return callback(err);
      }

      if (!result.rows[0]) {
        return callback(new UserNotFoundError());
      }
      const dbEntry = result.rows[0];
      paymentGateway.charge(dbEntry.gateway_id, amount, (err, response) => {
        if (err) {
          return callback(new PaymentGatewayError());
        }
        client.end(() => {
          return callback(null, response);
        });
      });
    });
  });
};

module.exports = {
  chargeUser,
  UserNotFoundError,
  PaymentGatewayError
};
