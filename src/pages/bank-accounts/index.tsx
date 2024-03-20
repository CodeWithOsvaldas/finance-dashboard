import DataTable from '@/components/DataTable/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { getBankAccountsColumns } from '@/pages/bank-accounts/bankAccountsColumns';
import { deleteBankAccount, getBankAccounts } from '@/services/bankAccount.service';
import { queryKeys } from '@/services/queryKey.factory';
import { BankAccount } from '@/types/BankAccount.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import BankAccountForm from './BankAccountForm';

const BankAccounts = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState<BankAccount | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: bankAccounts, isFetching } = useQuery({
    queryKey: queryKeys.fetchBankAccounts.all,
    queryFn: () => getBankAccounts(),
    initialData: [],
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBankAccount,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.fetchBankAccounts.all });
    },
  });

  const onDelete = useCallback((bankAccount: BankAccount) => {
    deleteMutation.mutate(bankAccount.id, {
      onSuccess: () => {
        toast({ description: 'Bank account was deleted successfully.' });
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Uh Oh! Something went wrong!',
          description: 'There was a problem with your request.',
        });
      },
    });
  }, []);

  const onEdit = useCallback((bankAccount: BankAccount) => {
    setSelectedBankAccount(bankAccount);
    setIsDialogOpen(true);
  }, []);

  const columns = useMemo(() => getBankAccountsColumns({ onEdit, onDelete }), []);
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Bank Accounts</CardTitle>
        <div className="flex justify-between">
          <div />
          <div className="flex-nowrap">
            <BankAccountForm
              isOpen={isDialogOpen}
              bankAccount={selectedBankAccount}
              onOpenChange={(value) => {
                setIsDialogOpen(value);
                if (!value) {
                  setSelectedBankAccount(null);
                }
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isFetching && <span>Loading</span>}
        {!isFetching && <DataTable data={bankAccounts} columns={columns} />}
      </CardContent>
    </Card>
  );
};

export default BankAccounts;
