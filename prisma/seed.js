const prisma = require('./prisma');

async function main() {
  const user = await prisma.user.create({
    include: { conta: true },
    data: {
      username: 'paulopeixoto',
      nome_completo: 'Paulo Eduardo Peixoto',
      email: 'peixoto.pauloeduardo@gmail.com',
      telefone: '1298826-8618',
      conta: {
        create: {
          numero: 16101990,
          saldo: 1000,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
