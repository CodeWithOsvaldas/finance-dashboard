import { Button } from '@/components/ui/button';
import CurrencyInput from '@/components/ui/CurrencyInput';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { createBankAccount, updateBankAccount } from '@/services/bankAccount.service';
import { useToast } from '@/components/ui/use-toast';
import { queryKeys } from '@/services/queryKey.factory';
import { BankAccount, CreateBankAccountDto } from '@/types/BankAccount.types';
import { convertCurrencyToNumber, isAmountWithinRange, MAX_VALUE } from '@/utils/numberUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  accountNumber: z
    .string()
    .min(1, { message: 'Account number is empty' })
    .max(50, { message: 'Account number should be shorter than 50 characters' }),
  balance: z
    .string({
      required_error: 'Balance is empty',
    })
    .refine(
      (value) => {
        return isAmountWithinRange(convertCurrencyToNumber(value));
      },
      { message: `Balance should be between -${MAX_VALUE} and ${MAX_VALUE}` }
    ),
});

interface BankAccountFormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  bankAccount: BankAccount | null;
}

const BankAccountForm = ({ isOpen, onOpenChange, bankAccount }: BankAccountFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: '',
    },
    mode: 'onChange',
  });

  const onCreateSuccess = async (newBankAccount: BankAccount) => {
    await queryClient.setQueryData(queryKeys.fetchBankAccounts.all, (oldData?: BankAccount[]) => {
      if (oldData) {
        return [newBankAccount, ...oldData];
      }
      return [newBankAccount];
    });
    toast({
      description: 'Bank Account was added successfully.',
    });
    onOpenChange(false);
  };

  const onUpdateSuccess = async (updatedBankAccount: BankAccount) => {
    await queryClient.setQueryData(queryKeys.fetchBankAccounts.all, (oldData?: BankAccount[]) => {
      if (oldData) {
        return oldData.map((bankAccount) =>
          bankAccount.id === updatedBankAccount.id ? updatedBankAccount : bankAccount
        );
      }
      return [updatedBankAccount];
    });
    toast({
      description: 'Bank Account was updated successfully.',
    });
    onOpenChange(false);
  };

  const onRequestError = () => {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
    });
  };

  const createMutation = useMutation({
    mutationFn: createBankAccount,
    onSuccess: onCreateSuccess,
    onError: onRequestError,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...dto }: CreateBankAccountDto & { id: number }) => updateBankAccount(id, dto),
    onSuccess: onUpdateSuccess,
    onError: onRequestError,
  });

  useEffect(() => {
    if (bankAccount) {
      form.reset({
        accountNumber: bankAccount.accountNumber,
        balance: bankAccount.balance.toString(),
      });
    } else {
      form.reset();
    }
  }, [isOpen, bankAccount]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values: z.infer<typeof formSchema>) => {
    const createDto: CreateBankAccountDto = {
      accountNumber: values.accountNumber,
      balance: convertCurrencyToNumber(values.balance),
    };
    if (!bankAccount) {
      createMutation.mutate(createDto);
    } else {
      updateMutation.mutate({ ...createDto, id: bankAccount.id });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{bankAccount ? 'Update the bank account' : 'Create new bank account'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              name="accountNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input placeholder="13719713158835300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="balance"
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <CurrencyInput value={value} onValueChange={(value) => onChange(value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="button"
            disabled={!form.formState.isValid || createMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BankAccountForm;
