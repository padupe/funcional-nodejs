'use strict';
const { buildSchema } = require('graphql');
const findAccount = require('../controllers/findAccount');
const updateAccount = require('../controllers/updateAccount');

const schema = buildSchema(`
type Account {
    number: Int
    balance_available: Int
    msg: String
}

type Query {
    available(account: Int!) : Account
}

type Mutation {
    withdraw(account: Int!, value: Int!): Account
    deposit(account: Int!, value: Int!): Account
}`);

const resolvers = {
  async available({ account }) {
    const accountfind = await findAccount(account);
    console.log(accountfind);

    //TODO - Resolve erro ao informar número da conta
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

module.exports = { schema, resolvers };
