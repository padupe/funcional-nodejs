const prisma = require('../prisma/prisma');

async function updateAccount(type, account, value) {
  if (type == 'withdraw') {
    let result = await prisma.account.update({
      where: { number: account },
      select: {
        number: true,
        balance_available: true,
      },
      data: {
        balance_available: balance_available - value,
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
