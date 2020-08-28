'use strict';

class UserNotFoundError extends Error { }

class ChargeUserCommand {

  constructor(paymentGateway, pool) {
    this.paymentGateway = paymentGateway;
    this.pool = pool;
  }

  execute(userId, amount, callback) {
    this.pool.query('SELECT gateway_id FROM mapping WHERE id = $1', [userId], (err, result) => {
      if (err) {
        return callback(err);
      }

      if (!result.rows[0]) {
        return callback(new UserNotFoundError());
      }
      const gatewayUserId = result.rows[0].gateway_id;
      this.paymentGateway.charge(gatewayUserId, amount, (err, response) => {
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
