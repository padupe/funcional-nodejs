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
      return new Error(`Você é pobre`);
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
      console.log('SALDO NA CONTA:', accountfind.balance_available);
      if (!accountfind) {
        return new Error(`Você é pobre`);
      }
      console.log(accountfind);
      const sold = accountfind.balance_available;
      console.log('SALDO', sold);
      if (value <= sold) {
        let accountWithdraw = await updateAccount(
          'withdraw',
          account,
          value,
          accountfind.balance_available
        );
        console.log('update', accountWithdraw);
        return {
          number: accountWithdraw.number,
          balance_available: accountWithdraw.balance_available,
        };
      } else {
        return new Error(`Você é pobre de novo!`);
      }
    } else {
      return new Error('O valor deve ser maior que zero!');
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
