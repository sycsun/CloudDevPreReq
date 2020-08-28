'use strict';

class UserNotFoundError extends Error { }

class ChargeUserCommand {

  constructor(paymentGateway, pool) {
    this.paymentGateway = paymentGateway;
    this.pool = pool;
  }

  execute(userId, amount, callback) {
    this.pool.query('SELECT * FROM users WHERE id = $1', [userId], (err, result) => {
      if (err) {
        return callback(err);
      }

      if (!result.rows[0]) {
        return callback(new UserNotFoundError());
      }
      const dbEntry = result.rows[0];
      this.paymentGateway.charge(dbEntry.gateway_id, amount, (err, response) => {
        if (err) {
          return callback(err);
        }
        return callback(null, response);
      });
    });
  }
}

ChargeUserCommand.UserNotFoundError = UserNotFoundError;

module.exports = ChargeUserCommand;
