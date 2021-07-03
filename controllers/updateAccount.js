const prisma = require('../prisma/prisma');

async function updateAccount(type, account, value, balance) {
  if (type == 'withdraw') {
    const total = balance - value;
    let result = await prisma.account.update({
      where: { number: account },
      select: {
        number: true,
        balance_available: true,
      },
      data: {
        balance_available: total,
      },
    });
    console.log('SAQUE:', result);
    return result;
  }
  if (type == 'deposit') {
    let result = await prisma.account.update({
      where: { number: account },
      select: {
        number: true,
        balance_available: true,
      },
      data: {
        balance_available: balance_available + value,
      },
    });
    return result;
  }
}

module.exports = updateAccount;
