const find = (prisma) => async (data) => {
  let result = await prisma.account.findUnique({
    where: { number: data },
    select: {
      number: true,
      balance_available: true,
    },
  });
  return result;
};

const updateBalance = (prisma) => async (total) => {
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
};

const withdraw = (prisma) => async (account, value) => {
  const total = account.balance_available - value;
  return await updateBalance(prisma)(account.number, total);
};
const deposit = (prisma) => async (account, value) => {
  const total = account.balance_available + value;
  return await updateBalance(prisma)(account.number, total);
};

module.exports = {
  withdraw,
  deposit,
  find,
};
