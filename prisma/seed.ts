// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { prisma } from '../src/server/db';
import { toCents } from '../src/utils/numberUtils';

const seedData = async (userId: string) => {
  try {
    console.log('Starting seeding...');

    await prisma.bankAccount.deleteMany({
      where: {
        userId,
      },
    });
    console.log(`Deleted ${userId} records in bankAccount table`);

    await prisma.transaction.deleteMany({
      where: {
        userId,
      },
    });
    console.log(`Deleted ${userId} records in transaction table`);

    await prisma.category.deleteMany({
      where: {
        userId,
      },
    });
    console.log(`Deleted ${userId} records in category table`);

    const bankAccount = await prisma.bankAccount.create({
      data: {
        accountNumber: faker.finance.bic({ includeBranchCode: true }),
        balance: toCents(faker.number.int({ min: 10, max: 15000 })),
        userId,
      },
    });
    console.log('Added bank account');

    await prisma.category.create({
      data: {
        type: 'INCOME',
        name: 'Salary',
        icon: 'money-bill',
        iconColor: '#13B2F6',
        userId,
        transaction: {
          createMany: {
            data: Array(3)
              .fill({})
              .map(() => ({
                bankAccountId: bankAccount.id,
                amount: toCents(Number(faker.finance.amount(1000, 5000))),
                date: faker.date.recent({ days: 20 }),
                userId,
              })),
          },
        },
      },
    });
    console.log('Added INCOME category with transactions');

    await prisma.category.create({
      data: {
        type: 'EXPENSE',
        name: 'Food',
        icon: 'utensils',
        iconColor: '#8b5cf6',
        userId,
        transaction: {
          createMany: {
            data: Array(5)
              .fill({})
              .map(() => ({
                bankAccountId: bankAccount.id,
                amount: toCents(Number(faker.finance.amount(10, 200))),
                recipient: faker.company.name(),
                note: faker.finance.transactionDescription(),
                date: faker.date.recent({ days: 20 }),
                userId,
              })),
          },
        },
      },
    });
    console.log('Added EXPENSE category with transactions');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

const SEED_USER_ID = 'google-oauth2|112098385484625086347';
seedData(SEED_USER_ID);
