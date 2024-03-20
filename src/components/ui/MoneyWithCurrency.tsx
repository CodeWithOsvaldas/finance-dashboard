import { formatCurrency } from '@/utils/numberUtils';
import cx from 'classnames';

interface MoneyWithCurrencyProps {
  amount: number;
}

const MoneyWithCurrency = ({ amount }: MoneyWithCurrencyProps) => {
  return (
    <span
      className={cx({
        'text-destructive': amount < 0,
      })}
    >
      {formatCurrency(amount)}
    </span>
  );
};

export default MoneyWithCurrency;
