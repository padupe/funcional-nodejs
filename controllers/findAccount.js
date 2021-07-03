const prisma = require('../prisma/prisma');

async function findAccount(data) {
  let result = await prisma.account.findUnique({
    where: { number: data },
    select: {
      number: true,
      balance_available: true,
    },
  });
  return result;
}

module.exports = findAccount;
