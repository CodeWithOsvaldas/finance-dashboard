import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BankAccountForm from './BankAccountForm';

const BankAccounts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bank Accounts</CardTitle>
        <div className="flex justify-between">
          <div />
          <div className="flex-nowrap">
            <BankAccountForm />
          </div>
        </div>
      </CardHeader>
      <CardContent>TODO</CardContent>
    </Card>
  );
};

export default BankAccounts;
