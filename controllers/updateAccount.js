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
    return result;
  }
  if (type == 'deposit') {
    const total = balance + value;
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
    return result;
  }
}

module.exports = updateAccount;
