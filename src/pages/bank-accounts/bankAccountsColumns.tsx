import DataTableColumnHeader from '@/components/DataTable/DataTableColumnHeader';
import DataTableRowActions from '@/components/DataTable/DataTableRowActions';
import MoneyWithCurrency from '@/components/ui/MoneyWithCurrency';
import { BankAccount } from '@/types/BankAccount.types';
import { ColumnDef } from '@tanstack/react-table';

interface BankAccountsColumnsProps {
  onEdit: (bankAccount: BankAccount) => void;
  onDelete: (bankAccount: BankAccount) => void;
}

export const getBankAccountsColumns = ({ onEdit, onDelete }: BankAccountsColumnsProps): ColumnDef<BankAccount>[] => [
  {
    accessorKey: 'accountNumber',
    header: 'Account Number',
    footer: 'Total',
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => <DataTableColumnHeader className="text-right" column={column} title="Balance" />,
    cell: ({ row }) => (
      <div className="text-right">
        <MoneyWithCurrency amount={row.original.balance} />
      </div>
    ),
    footer: (props) => {
      const totalBalance = props.table
        .getRowModel()
        .rows.reduce((sum, bankAccountRow) => sum + bankAccountRow.original.balance, 0);
      return (
        <div className="text-right">
          <MoneyWithCurrency amount={totalBalance} />
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50,
  },
];
