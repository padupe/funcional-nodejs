const find = (prisma) => async (data) => {
  let result = await prisma.conta.findUnique({
    where: { numero: data },
    select: {
      numero: true,
      saldo: true,
    },
  });
  return result;
};

const updateBalance = (prisma) => async (account_number, total) => {
  let result = await prisma.conta.update({
    where: { numero: account_number },
    select: {
      numero: true,
      saldo: true,
    },
    data: {
      saldo: total,
    },
  });
  return result;
};

const withdraw = (prisma) => async (conta, valor) => {
  const total = conta.saldo - valor;
  return await updateBalance(prisma)(conta.numero, total);
};
const deposit = (prisma) => async (conta, valor) => {
  const total = conta.saldo + valor;
  return await updateBalance(prisma)(conta.numero, total);
};

module.exports = {
  withdraw,
  deposit,
  find,
};
