'use client';

import {
  faCalendar,
  faClose,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import Flag from 'react-flags/vendor/flags/flags-iso/flat/svg/ID.svg';
import { RenderCategory } from '$components/OneTransaction/atomic/RenderCategory';

interface Props {
  transaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction;

  isOpen: boolean;
  onCloseModal: () => void;
}

const ModalShowTransaction: React.FC<Props> = ({
  transaction,
  isOpen,
  onCloseModal,
}) => {
  const showCategory = () => {
    const { category } = transaction;
    if (category !== null) {
      return (
        <div className="flex flex-col">
          <p>Category</p>
          {category.map((value, index) => {
            return (
              <div key={index}>
                <RenderCategory category={value.name} />
                <p>
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  }).format(Number(value.amount))}
                </p>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <motion.div
      className="h-[100vh] max-h-[100vh] overflow-y-auto w-fit bg-background/50 dark:bg-onBackground/50 fixed right-0 top-0 flex flex-col gap-10 border-l-4 border-gray-500"
      animate={isOpen ? 'open' : 'closed'}
      variants={{
        open: { width: 500 },
        closed: { width: 0 },
      }}
    >
      <div className="flex justify-between border-b-2 border-gray-500 px-4 py-3">
        <div className="flex gap-2 items-center justify-center">
          <button
            onClick={onCloseModal}
            className="w-[25px] h-[25px] rounded-full text-primary dark:text-primaryDark hover:bg-primary dark:hover:bg-primaryDark hover:text-onPrimary dark:hover:text-onPrimaryDark flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faClose} size={'xl'} />
          </button>
          <p className="font-bold text-onPrimaryContainer dark:text-surfaceVariant text-2xl">
            Transaction Details
          </p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <button className="px-2 py-1 rounded-md shadow-md border-2 border-primary dark:border-primaryDark text-primary dark:text-primaryDark hover:bg-primary dark:hover:bg-primaryDark hover:text-onPrimary dark:hover:text-onPrimaryDark">
            Edit
          </button>
          <button className="px-2 py-1 rounded-md shadow-md border-2 border-error dark:border-errorDark text-error dark:text-errorDark hover:bg-error dark:hover:bg-errorDark hover:text-onError dark:hover:text-onErrorDark">
            <FontAwesomeIcon icon={faTrashAlt} size={'lg'} />
          </button>
        </div>
      </div>
      <div className="flex flex-col px-4">
        <div className="flex gap-4">
          <div className="flex flex-col items-start justify-center">
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Currency
            </p>
            <div className="flex w-fit h-fit gap-2 px-2 py-1.5 bg-gray-500 rounded-lg">
              <Image src={Flag} alt="Indonesian Flag" height={10} />
              <p className="text-onPrimaryContainer">{transaction.currency}</p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center">
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Type
            </p>
            <div className="flex w-fit h-fit gap-2 px-2 py-1.5 bg-gray-500 rounded-lg">
              <p className="text-onPrimaryContainer">
                {transaction.transactionType.charAt(0)}
                {transaction.transactionType.slice(1).toLowerCase()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col items-start justify-center">
            <p className="text-onPrimaryContainer/70 dark:text-surfaceVariant/70 text-sm">
              <FontAwesomeIcon icon={faCalendar} />
              {moment(transaction.dateTimestamp).format('dddd, D MMMM YYYY')}
            </p>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant font-medium text-lg">
              {transaction.transactionName}
            </p>
          </div>
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
            }).format(Number(transaction.amount))}
          </p>
        </div>
        {showCategory()}

        <div>
          <div></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModalShowTransaction;
