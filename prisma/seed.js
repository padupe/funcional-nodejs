const prisma = require('./prisma');

async function clearDatabase() {
  await prisma.conta.deleteMany({ where: {} });
  await prisma.usuario.deleteMany({ where: {} });
}

const default_user = {
  usuario: 'paulopeixoto',
  nomeCompleto: 'Paulo Eduardo Peixoto',
  email: 'peixoto.pauloeduardo@gmail.com',
  telefone: '(12) 98826-8618',
  conta: {
    numero: 54321,
    saldo: 220,
  },
};

async function generateUser() {
  const user = await prisma.usuario.create({
    include: { conta: true },
    data: {
      usuario: default_user.usuario,
      nomeCompleto: default_user.nomeCompleto,
      email: default_user.email,
      telefone: default_user.telefone,
      conta: {
        create: {
          numero: default_user.conta.numero,
          saldo: default_user.conta.saldo,
        },
      },
    },
  });
}
async function main() {
  await generateUser();
}
if (process.env.NODE_ENV !== 'test') {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = {
  generateUser,
  clearDatabase,
  default_user,
};
