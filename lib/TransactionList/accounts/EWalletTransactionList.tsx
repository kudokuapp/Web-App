import ModalShowTransaction from '$components/ModalShowTransaction';
import OneTransaction from '$components/OneTransaction';
import { DeviceContext } from '$context/DeviceContext';
import { useSubscription } from '@apollo/client';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { addMerchant, editEWalletTransaction } from '../graphql/mutation';
import { getAllMerchant } from '../graphql/query';
import {
  eWalletTransactionLive,
  merchantSubscription,
} from '../graphql/subscription';

interface IData {
  mutationType: 'ADD' | 'EDIT';
  transaction: IGetAllEWalletTransaction;
}

interface IEWalletTransactionList {
  eWalletTransactions: IGetAllEWalletTransaction[];
  eWalletAccountId: string;
  token: string;
}

const EWalletTransactionList: React.FC<IEWalletTransactionList> = ({
  eWalletTransactions,
  eWalletAccountId,
  token,
}) => {
  const [eWalletTransaction, setEWalletTransaction] =
    useState(eWalletTransactions);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<IGetAllEWalletTransaction | null>(null);
  const { isDesktop } = useContext(DeviceContext);

  const { data } = useSubscription(eWalletTransactionLive, {
    variables: { eWalletAccountId },
  });

  useEffect(() => {
    if (data) {
      const { eWalletTransactionLive }: { eWalletTransactionLive: IData } =
        data;
      const { mutationType, transaction } = eWalletTransactionLive;

      if (mutationType === 'ADD') {
        const array = [transaction, ...eWalletTransaction];
        setEWalletTransaction(array);
      }

      if (mutationType === 'EDIT') {
        const array = [...eWalletTransaction];
        const index = array.findIndex((item) => {
          return transaction.id === item.id;
        });
        array[index] = transaction;

        setEWalletTransaction(array);
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
      {eWalletTransaction.map((value, index) => {
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
          accountType={'ewallet'}
          onSaveEditFunction={editEWalletTransaction}
          onAddMerchant={addMerchant}
          merchantSubscription={merchantSubscription}
          getAllMerchant={getAllMerchant}
        />
      )}
    </motion.div>
  );
};

export default EWalletTransactionList;
