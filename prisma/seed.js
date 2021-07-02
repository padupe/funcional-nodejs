const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            username: 'paulopeixoto',
            full_name: 'Paulo Eduardo Peixoto',
            email: 'peixoto.pauloeduardo@gmail.com',
            phone_number: '1298826-8618',
        }
    })

    const account = await prisma.account.create({
        data: {
            userId: user.id,
            balance_available: 1000
        }      
    })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });