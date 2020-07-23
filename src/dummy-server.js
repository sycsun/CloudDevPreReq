class DummyServer {

  constructor(users) {
    this.users = users;
  }

  charge(userId, amount, callback) {
    setTimeout(() => {
    const userIndex = this.users.findIndex((user) => {
      return user.id === userId
    });

    const user = this.users[userIndex];

    if (!user) {
      return callback(new Error('User not found!'));
    }

    if (user.balance < amount) {
      return callback(new Error('Amount exceeds users balance.'));
    }
    
    user.balance -= amount;

    return callback(null, {
      newBalance: user.balance
    });
    }, 300);
  };
};

module.exports = DummyServer;
