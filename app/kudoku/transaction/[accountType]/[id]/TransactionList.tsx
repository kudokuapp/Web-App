'use client';

import ModalShowTransaction, {
  ModalShowTransactionMobile,
} from '$components/ModalShowTransaction/ModalShowTransactionDesktop';
import OneTransaction from '$components/OneTransaction';
import { DeviceContext } from '$context/DeviceContext';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';

interface Props {
  transactions:
    | IGetAllCashTransaction[]
    | IGetAllDebitTransaction[]
    | IGetAllEMoneyTransaction[]
    | IGetAllEWalletTransaction[]
    | IGetAllPayLaterTransaction[];

  token: string;
  accountType: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney';
}

const TransactionList: React.FC<Props> = ({
  transactions,
  token,
  accountType,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEMoneyTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | null
  >(null);
  const { isDesktop } = useContext(DeviceContext);

  return (
    <motion.div
      className="w-full h-fit flex flex-col gap-4"
      animate={modalIsOpen && isDesktop ? 'open' : 'closed'}
      variants={{
        open: { paddingRight: 500 },
        closed: { paddingRight: 0 },
      }}
    >
      {transactions.map((transaction) => {
        const { __typename } = transaction;
        if (
          __typename !== 'CashTransaction' &&
          __typename !== 'DebitTransaction' &&
          __typename !== 'EMoneyTransaction' &&
          __typename !== 'EWalletTransaction' &&
          __typename !== 'PayLaterTransaction'
        ) {
          return null;
        } else {
          return (
            <div key={transaction.id}>
              <OneTransaction
                transaction={transaction}
                onClick={() => {
                  setSelectedTransaction(null);
                  setSelectedTransaction(transaction);
                  setModalIsOpen(true);
                }}
                selectedTransaction={selectedTransaction}
              />
            </div>
          );
        }
      })}

      {selectedTransaction && isDesktop && (
        <ModalShowTransaction
          transaction={selectedTransaction}
          onCloseModal={() => {
            setSelectedTransaction(null);
            setModalIsOpen(false);
          }}
          isOpen={modalIsOpen}
          token={token}
          accountType={accountType}
        />
      )}

      {selectedTransaction && !isDesktop && (
        <ModalShowTransactionMobile
          transaction={selectedTransaction}
          onCloseModal={() => {
            setSelectedTransaction(null);
            setModalIsOpen(false);
          }}
          isOpen={modalIsOpen}
          token={token}
          accountType={accountType}
        />
      )}
    </motion.div>
  );
};

export default TransactionList;
