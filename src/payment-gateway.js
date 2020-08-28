'use strict';

class OverdraftError extends Error { }

class PaymentGateway {

  constructor(users) {
    this.users = users;
  }

  charge(id, amount, callback) {
    setTimeout(() => {
      const user = this.users[id];
      let error = null;
      let response = null;

      if (user.balance < amount) {
        error = new OverdraftError();
      } else {
        user.balance -= amount;
        response = { newBalance: user.balance }
      }

      return callback(error, response);
    }, 50);
  }
}

PaymentGateway.OverdraftError = OverdraftError;

module.exports = PaymentGateway;
