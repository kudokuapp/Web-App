import ModalShowTransaction from '$components/ModalShowTransaction';
import OneTransaction from '$components/OneTransaction';
import { DeviceContext } from '$context/DeviceContext';
import { useSubscription } from '@apollo/client';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { addMerchant, editCashTransaction } from '../graphql/mutation';
import { getAllMerchant } from '../graphql/query';
import {
  cashTransactionLive,
  merchantSubscription,
} from '../graphql/subscription';

interface IData {
  mutationType: 'ADD' | 'EDIT' | 'DELETE';
  transaction: IGetAllCashTransaction;
}

interface ICashTransactionList {
  cashTransactions: IGetAllCashTransaction[];
  cashAccountId: string;
  token: string;
}

const CashTransactionList: React.FC<ICashTransactionList> = ({
  cashTransactions,
  cashAccountId,
  token,
}) => {
  const [cashTransaction, setCashTransaction] = useState(cashTransactions);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<IGetAllCashTransaction | null>(null);
  const { isDesktop } = useContext(DeviceContext);

  const { data } = useSubscription(cashTransactionLive, {
    variables: { cashAccountId },
  });

  useEffect(() => {
    if (data) {
      const { cashTransactionLive }: { cashTransactionLive: IData } = data;
      const { mutationType, transaction } = cashTransactionLive;

      if (mutationType === 'ADD') {
        const array = [transaction, ...cashTransaction];
        setCashTransaction(array);
      }

      if (mutationType === 'EDIT') {
        const array = [...cashTransaction];
        const index = array.findIndex((item) => {
          return transaction.id === item.id;
        });
        array[index] = transaction;

        setCashTransaction(array);
      }

      if (mutationType === 'DELETE') {
        const deletedTransactionId = transaction.id;
        const array = cashTransaction.filter((item) => {
          return item.id !== deletedTransactionId;
        });
        setCashTransaction(array);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <motion.div
      className="w-full h-fit flex flex-col gap-4"
      animate={modalIsOpen && isDesktop ? 'open' : 'closed'}
      variants={{
        open: { paddingRight: 500 },
        closed: { paddingRight: 0 },
      }}
    >
      {cashTransaction.map((value, index) => {
        return (
          <OneTransaction
            key={index}
            transaction={value}
            onClick={() => {
              setSelectedTransaction(null);
              setSelectedTransaction(value);
              setModalIsOpen(true);
            }}
            selectedTransaction={selectedTransaction}
          />
        );
      })}

      {selectedTransaction && (
        <ModalShowTransaction
          transaction={selectedTransaction}
          onCloseModal={() => {
            setSelectedTransaction(null);
            setModalIsOpen(false);
          }}
          isOpen={modalIsOpen}
          token={token}
          accountType={'cash'}
          onSaveEditFunction={editCashTransaction}
          onAddMerchant={addMerchant}
          merchantSubscription={merchantSubscription}
          getAllMerchant={getAllMerchant}
        />
      )}
    </motion.div>
  );
};

export default CashTransactionList;
