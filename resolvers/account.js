'use strict';
const { find, deposit, withdraw } = require('../models/account');

const resolvers = {
  async available({ account }) {
    const accountfind = await findAccount(account);

    if (!accountfind) {
      return new Error(`Account not found!`);
    }
    return accountfind;
  },
  async withdraw({ account, value }) {
    if (value <= 0) {
      return new Error('The value must be greater than zero!');
    }

    let accountfind = await find(account);
    if (!accountfind) {
      return new Error(`Account not found!`);
    }
    const balance = accountfind.balance_available;
    if (value > balance) {
      return new Error(`Insufficient funds!`);
    }
    let accountWithdraw = await withdraw(account, value);
    return { ...accountWithdraw, msg: 'Successful withdrawal!' };
  },
  async deposit({ account, value }) {
    if (value > 0) {
      let accountfind = await find(account);
      if (!accountfind) {
        return new Error(`Account not found!`);
      }
      const sold = accountfind.balance_available;
      let accountDeposit = await deposit(accountfind, value);
      return { ...accountWithdraw, msg: 'Deposit successful!' };
    } else {
      return new Error('The value must be greater than zero!');
    }
  },
};

module.exports = { accountResolvers };
