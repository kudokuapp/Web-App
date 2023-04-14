import ModalShowTransaction from '$components/ModalShowTransaction';
import OneTransaction from '$components/OneTransaction';
import { DeviceContext } from '$context/DeviceContext';
import { useSubscription } from '@apollo/client';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { addMerchant, editDebitTransaction } from '../graphql/mutation';
import { getAllMerchant } from '../graphql/query';
import {
  debitTransactionLive,
  merchantSubscription,
} from '../graphql/subscription';

interface IData {
  mutationType: 'ADD' | 'EDIT';
  transaction: IGetAllDebitTransaction;
}

interface IDebitTransactionList {
  debitTransactions: IGetAllDebitTransaction[];
  debitAccountId: string;
  token: string;
}

const DebitTransactionList: React.FC<IDebitTransactionList> = ({
  debitTransactions,
  debitAccountId,
  token,
}) => {
  const [debitTransaction, setDebitTransaction] = useState(debitTransactions);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<IGetAllDebitTransaction | null>(null);
  const { isDesktop } = useContext(DeviceContext);

  const { data } = useSubscription(debitTransactionLive, {
    variables: { debitAccountId },
  });

  useEffect(() => {
    if (data) {
      const { debitTransactionLive }: { debitTransactionLive: IData } = data;
      const { mutationType, transaction } = debitTransactionLive;

      if (mutationType === 'ADD') {
        const array = [transaction, ...debitTransaction];
        setDebitTransaction(array);
      }

      if (mutationType === 'EDIT') {
        const array = [...debitTransaction];
        const index = array.findIndex((item) => {
          return transaction.id === item.id;
        });
        array[index] = transaction;

        setDebitTransaction(array);
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
      {debitTransaction.map((value, index) => {
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
          accountType={'debit'}
          onSaveEditFunction={editDebitTransaction}
          onAddMerchant={addMerchant}
          merchantSubscription={merchantSubscription}
          getAllMerchant={getAllMerchant}
        />
      )}
    </motion.div>
  );
};

export default DebitTransactionList;
