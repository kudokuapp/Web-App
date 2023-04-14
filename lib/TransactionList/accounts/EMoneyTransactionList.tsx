import ModalShowTransaction from '$components/ModalShowTransaction';
import OneTransaction from '$components/OneTransaction';
import { DeviceContext } from '$context/DeviceContext';
import { useSubscription } from '@apollo/client';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { addMerchant, editEMoneyTransaction } from '../graphql/mutation';
import { getAllMerchant } from '../graphql/query';
import {
  eMoneyTransactionLive,
  merchantSubscription,
} from '../graphql/subscription';

interface IData {
  mutationType: 'ADD' | 'EDIT' | 'DELETE';
  transaction: IGetAllEMoneyTransaction;
}

interface IEMoneyTransactionList {
  eMoneyTransactions: IGetAllEMoneyTransaction[];
  eMoneyAccountId: string;
  token: string;
}

const EMoneyTransactionList: React.FC<IEMoneyTransactionList> = ({
  eMoneyTransactions,
  eMoneyAccountId,
  token,
}) => {
  const [eMoneyTransaction, setEMoneyTransaction] =
    useState(eMoneyTransactions);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<IGetAllEMoneyTransaction | null>(null);
  const { isDesktop } = useContext(DeviceContext);

  const { data } = useSubscription(eMoneyTransactionLive, {
    variables: { eMoneyAccountId },
  });

  useEffect(() => {
    if (data) {
      const { eMoneyTransactionLive }: { eMoneyTransactionLive: IData } = data;
      const { mutationType, transaction } = eMoneyTransactionLive;

      if (mutationType === 'ADD') {
        const array = [transaction, ...eMoneyTransaction];
        setEMoneyTransaction(array);
      }

      if (mutationType === 'EDIT') {
        const array = [...eMoneyTransaction];
        const index = array.findIndex((item) => {
          return transaction.id === item.id;
        });
        array[index] = transaction;

        setEMoneyTransaction(array);
      }

      if (mutationType === 'DELETE') {
        const deletedTransactionId = transaction.id;
        const array = eMoneyTransaction.filter((item) => {
          return item.id !== deletedTransactionId;
        });
        setEMoneyTransaction(array);
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
      {eMoneyTransaction.map((value, index) => {
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
          accountType={'emoney'}
          onSaveEditFunction={editEMoneyTransaction}
          onAddMerchant={addMerchant}
          merchantSubscription={merchantSubscription}
          getAllMerchant={getAllMerchant}
        />
      )}
    </motion.div>
  );
};

export default EMoneyTransactionList;
