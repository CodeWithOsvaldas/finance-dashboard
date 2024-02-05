import api from '@/services/api.service';
import { BankAccount, CreateBankAccountDto } from '@/types/BankAccount.types';

const URL = '/bank-accounts';
export const createBankAccount = async (bankAccount: CreateBankAccountDto): Promise<BankAccount> => {
  const { data } = await api.post(URL, bankAccount);
  return data;
};
