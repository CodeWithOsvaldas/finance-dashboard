import { Button } from '@/components/ui/button';
import CurrencyInput from '@/components/ui/CurrencyInput';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { createBankAccount } from '@/services/bankAccount.service';
import { useToast } from '@/components/ui/use-toast';
import { BankAccount, CreateBankAccountDto } from '@/types/BankAccount.types';
import { convertCurrencyToNumber, isAmountWithinRange, MAX_VALUE } from '@/utils/numberUtils';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
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

const BankAccountForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: '',
    },
    mode: 'onChange',
  });

  const createMutation = useMutation({
    mutationFn: createBankAccount,
    onSuccess: (newBankAccount: BankAccount) => {
      // ?
      toast({
        description: 'Bank Account was added successfully.',
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    },
  });

  useEffect(() => {
    form.reset();
  }, [isDialogOpen]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values: z.infer<typeof formSchema>) => {
    const createDto: CreateBankAccountDto = {
      accountNumber: values.accountNumber,
      balance: convertCurrencyToNumber(values.balance),
    };
    createMutation.mutate(createDto);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger asChild>
        <Button size="sm">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new bank account</DialogTitle>
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
