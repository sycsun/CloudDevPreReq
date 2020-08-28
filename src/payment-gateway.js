'use strict';

class Paymentgateway {

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
        error = new Error('User not found!');
      } else if (user.balance < amount) {
        error = new Error('Amount exceeds users balance.');
      } else {
        user.balance -= amount;
        response = { newBalance: user.balance }
      }

      return callback(error, response);
    }, 50);
  }
}

module.exports = Paymentgateway;
