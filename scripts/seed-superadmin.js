
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = 'info@dinidugardens.lk';
  const name = 'Dinidu Admin';
  const password = 'dinidu123@';
  
  console.log('--- Super Admin Creation ---');
  
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    console.log(`User ${email} already exists. Updating to SUPER_ADMIN...`);
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email },
      data: {
        name,
        password: hashedPassword,
        role: 'SUPER_ADMIN'
      }
    });
    console.log('Updated successfully.');
  } else {
    console.log(`Creating new user ${email}...`);
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'SUPER_ADMIN'
      }
    });
    console.log('Created successfully.');
  }

  console.log('-----------------------------');
  console.log('Email: ' + email);
  console.log('Password: ' + password);
  console.log('Role: SUPER_ADMIN');
  console.log('-----------------------------');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
