'use strict';
const findAccount = require('../controllers/findAccount');
const updateAccount = require('../controllers/updateAccount');

const resolvers = {
  async available({ account }) {
    const accountfind = await findAccount(account);

    if (!accountfind) {
      return new Error(`Account not found!`);
    }
    return {
      number: accountfind.number,
      balance_available: accountfind.balance_available,
    };
  },
  async withdraw({ account, value }) {
    if (value > 0) {
      let accountfind = await findAccount(account);
      if (!accountfind) {
        return new Error(`Account not found!`);
      }
      const sold = accountfind.balance_available;
      if (value <= sold) {
        let accountWithdraw = await updateAccount(
          'withdraw',
          account,
          value,
          accountfind.balance_available
        );
        return {
          number: accountWithdraw.number,
          balance_available: accountWithdraw.balance_available,
          msg: 'Successful withdrawal!',
        };
      } else {
        return new Error(`Insufficient funds!`);
      }
    } else {
      return new Error('The value must be greater than zero!');
    }
  },
  async deposit({ account, value }) {
    if (value > 0) {
      let accountfind = await findAccount(account);
      if (!accountfind) {
        return new Error(`Account not found!`);
      }
      const sold = accountfind.balance_available;
      let accountDeposit = await updateAccount(
        'deposit',
        account,
        value,
        accountfind.balance_available
      );
      return {
        number: accountDeposit.number,
        balance_available: accountDeposit.balance_available,
        msg: 'Deposit successful!',
      };
    } else {
      return new Error('The value must be greater than zero!');
    }
  },
};

module.exports = { accountResolvers };
