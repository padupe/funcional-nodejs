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

    if (accountfind == null) {
      return {
        msg: 'Account not Found!',
      };
    }
    return {
      number: accountfind.number,
      balance_available: accountfind.balance_available,
    };
  },
  async withdraw({ account, value }) {
    console.log('valor do saque:', value);
    if (value > 0) {
      let accountfind = await findAccount(account);

      if (accountfind) {
        const sold = accountfind.balance_available;
        console.log('SALDO', sold);
        if (value <= sold) {
          let accountWithdraw = await updateAccount('withdraw', account, value);
          console.log('update');
          return {
            number: accountWithdraw.number,
            balance_available: accountWithdraw.balance_available,
          };
        } else {
          return {
            number: accountfind.number,
            balance_available: accountfind.balance_available,
            msg: 'Insufficient funds',
          };
        }
      }
    }
  },
  //   Query: {
  //     avaiable: (_, { account }) => {
  //       return {
  //         number,
  //         balance_avaiable,
  //       };
  //     },
  //   },
  //   Mutation: {
  //     createUser: (_, { name, email, conta, saldo }) => {
  //       return { conta: conta, saldo: saldo };
  //     },
  //     sacar: (_, { conta, valor }) => {
  //       return new Error(`Você é pobre`);
  //     },
  //     depositar: (_, { conta, valor }) => {
  //       return { conta: conta, saldo: valor };
  //     },
  //   },
};

module.exports = { schema, resolvers };
