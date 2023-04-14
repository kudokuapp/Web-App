import { IEditableTransaction } from '../index.d';

interface IRenderAmount {
  transaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction;

  data: IEditableTransaction;
}

export const RenderAmount: React.FC<IRenderAmount> = ({
  transaction,
  data,
}) => {
  return (
    <p
      className={`font-medium text-lg ${
        transaction.direction === 'IN'
          ? 'dark:text-green-300 text-green-600'
          : 'text-onPrimaryContainer dark:text-surfaceVariant'
      }`}
    >
      {transaction.direction === 'IN' ? '+' : ''}
      {new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(Number(data.amount))}
    </p>
  );
};
