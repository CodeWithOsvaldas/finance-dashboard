import { Prisma } from '@/server/db';
import { z } from 'zod';

export const CreateBankAccountZod = z.object({
  accountNumber: z.string(),
  balance: z.preprocess((balance) => parseFloat(balance as string), z.number()),
});

export type CreateBankAccountDto = z.infer<typeof CreateBankAccountZod>;

export type BankAccount = Prisma.BankAccountGetPayload<Prisma.BankAccountDefaultArgs>;
