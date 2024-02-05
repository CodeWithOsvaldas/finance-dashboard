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
