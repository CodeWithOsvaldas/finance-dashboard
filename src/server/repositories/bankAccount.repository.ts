import { BankAccount, CreateBankAccountDto } from '@/types/BankAccount.types';
import { prisma } from '@/server/db';
import { toCents } from '@/utils/numberUtils';

const transformBankAccount = ({ id, accountNumber, balance }: BankAccount) => ({
  id,
  accountNumber,
  balance: balance / 100,
});

export const create = async (bankAccount: CreateBankAccountDto, userId: string) => {
  const createdBankAccount = await prisma.bankAccount.create({
    data: {
      accountNumber: bankAccount.accountNumber,
      balance: toCents(bankAccount.balance),
      userId,
    },
  });
  return transformBankAccount(createdBankAccount);
};

export const getAll = async (userId: string) => {
  const bankAccounts = await prisma.bankAccount.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: 'desc',
    },
  });

  return bankAccounts.map((bankAccount) => transformBankAccount(bankAccount));
};

export const deleteById = (id: number, userId: string) => {
  return prisma.bankAccount.delete({
    where: {
      id,
      userId,
    },
  });
};

export const update = async (id: number, bankAccount: CreateBankAccountDto) => {
  const updateBankAccount = await prisma.bankAccount.update({
    data: {
      ...bankAccount,
      balance: toCents(bankAccount.balance),
    },
    where: {
      id,
    },
  });
  return transformBankAccount(updateBankAccount);
};
