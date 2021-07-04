'use strict';
const { find, deposit, withdraw } = require('../models/account');
const prisma = require('../prisma/prisma');

const accountResolvers = {
  async saldo({ conta }) {
    const accountfind = await find(prisma)(conta);

    if (!accountfind) {
      return new Error(`Conta não localizada!`);
    }
    return accountfind;
  },

  async sacar({ conta, valor }) {
    if (valor <= 0) {
      return new Error('O valor precisa ser maior que zero!');
    }

    let accountfind = await find(prisma)(conta);
    if (!accountfind) {
      return new Error(`Conta não localizada!`);
    }
    const saldo = accountfind.saldo;
    if (valor > saldo) {
      return new Error(`Saldo Insuficiente!`);
    }
    let accountWithdraw = await withdraw(prisma)(accountfind, valor);
    return { ...accountWithdraw, msg: 'Saque realizado com sucesso!' };
  },

  async depositar({ conta, valor }) {
    if (valor > 0) {
      let accountfind = await find(prisma)(conta);
      if (!accountfind) {
        return new Error(`Conta não localizada!`);
      }
      const saldo = accountfind.saldo;
      let accountDeposit = await deposit(prisma)(accountfind, valor);
      return { ...accountDeposit, msg: 'Depósito realizado com sucesso!' };
    } else {
      return new Error('O valor precisa ser maior que zero!');
    }
  },
};

module.exports = { accountResolvers };
