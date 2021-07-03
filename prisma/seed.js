const prisma = require('./prisma');

async function main() {
  const user = await prisma.user.create({
    include: { account: true },
    data: {
      username: 'paulopeixoto',
      full_name: 'Paulo Eduardo Peixoto',
      email: 'peixoto.pauloeduardo@gmail.com',
      phone_number: '1298826-8618',
      account: {
        create: {
          number: 16101990,
          balance_available: 1000,
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
