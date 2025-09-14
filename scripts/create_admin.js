const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
  const prisma = new PrismaClient();
  try {
    let user = await prisma.user.findUnique({ where: { email: 'admin@example.com' } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'admin@example.com',
          name: 'Admin',
          password: bcrypt.hashSync('admin123', 12),
          role: 'ADMIN',
        },
      });
      console.log('Created admin@example.com / admin123');
    } else if (user.role !== 'ADMIN') {
      await prisma.user.update({ where: { email: 'admin@example.com' }, data: { role: 'ADMIN' } });
      console.log('Promoted existing user to ADMIN');
    } else {
      console.log('Admin user already exists');
    }
  } finally {
    process.exit(0);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
