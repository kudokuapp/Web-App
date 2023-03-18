'use client';

import { motion } from 'framer-motion';
import moment from 'moment';
import { RenderCategory } from './atomic/RenderCategory';
import { RenderMerchant } from './atomic/RenderMerchant';

interface Props {
  transaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction;

  onClick: () => void;

  selectedTransaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction
    | null;
}

const OneTransaction: React.FC<Props> = ({
  transaction,
  onClick,
  selectedTransaction,
}) => {
  const renderCategoryName = () => {
    if (transaction.category !== null) {
      if (transaction.category.length === 1) {
        return transaction.category[0].name;
      } else {
        const maxItem = transaction.category.reduce(
          (
            max: { amount: number | undefined; name: string | undefined },
            item
          ) => {
            const amount = parseFloat(item.amount);
            3;
            return isNaN(amount) || amount <= (max.amount ?? -Infinity)
              ? max
              : { amount, name: item.name };
          },
          { amount: undefined, name: undefined }
        );

        return maxItem.name;
      }
    }
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      {selectedTransaction !== null &&
        selectedTransaction.id === transaction.id && (
          <motion.div
            className="bg-primary dark:bg-primaryDark h-[30px] rounded-tr-lg rounded-br-lg"
            animate={{ width: 10 }}
          />
        )}
      <motion.button
        whileHover={{ scale: 1.01 }}
        className={`w-full sm:grid sm:grid-cols-3 flex justify-between dark:text-surfaceVariant text-onPrimaryContainer sm:text-base text-sm`}
        onClick={onClick}
      >
        <div className="flex gap-4 items-center justify-start">
          <div className="flex items-center justify-center max-w-[30px] max-h-[30px] min-w-[30px] min-h-[30px]">
            <RenderMerchant
              merchantId={transaction.merchantId}
              direction={transaction.direction}
              merchantName={transaction.merchant.name}
            />
          </div>
          <div className="flex flex-col gap-0 items-start justify-center">
            <p className="sm:max-w-full truncate max-w-[90px]">
              {transaction.transactionName}
            </p>
            <p className="text-xs">
              {moment(transaction.dateTimestamp).format('DD MMM YY')}
            </p>
          </div>
        </div>

        <div className="flex sm:flex-row flex-col gap-2 items-center justify-center">
          <RenderCategory category={renderCategoryName() as string} />
          {transaction.category !== null && (
            <p className="text-xs">
              {transaction.category.length > 1
                ? `& ${transaction.category.length - 1} more`
                : ''}
            </p>
          )}
        </div>

        <p
          className={`${
            transaction.direction === 'IN'
              ? 'dark:text-green-300 text-green-600'
              : ''
          }`}
        >
          {transaction.direction === 'IN' ? '+' : ''}
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(Number(transaction.amount))}
        </p>
      </motion.button>
    </div>
  );
};

export default OneTransaction;
