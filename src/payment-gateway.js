'use strict';

class PaymentGatewayError extends Error {}

class PaymentGateway {

  constructor(users) {
    this.users = users;
  }

  charge(userId, amount, callback) {
    setTimeout(() => {
      const userIndex = this.users.findIndex((user) => user.id === userId);
      const user = this.users[userIndex];
      let error = null;
      let response = null;

      if (!user) {
        error = new PaymentGatewayError('User not found');
      } else if (user.balance < amount) {
        error = new PaymentGatewayError('Overdraft');
      } else {
        user.balance -= amount;
        response = { newBalance: user.balance }
      }

      return callback(error, response);
    }, 50);
  }
}

PaymentGateway.PaymentGatewayError = PaymentGatewayError;

module.exports = PaymentGateway;
