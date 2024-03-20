import api from '@/services/api.service';
import { BankAccount, CreateBankAccountDto } from '@/types/BankAccount.types';

const URL = '/bank-accounts';

export const getBankAccounts = async (): Promise<BankAccount[]> => {
  const { data } = await api.get(URL);
  return data;
};

export const createBankAccount = async (bankAccount: CreateBankAccountDto): Promise<BankAccount> => {
  const { data } = await api.post(URL, bankAccount);
  return data;
};

export const updateBankAccount = async (id: number, bankAccount: CreateBankAccountDto): Promise<BankAccount> => {
  const { data } = await api.put(`${URL}/${id}`, bankAccount);
  return data;
};

export const deleteBankAccount = async (id: number) => {
  return api.delete(`${URL}/${id}`);
};
