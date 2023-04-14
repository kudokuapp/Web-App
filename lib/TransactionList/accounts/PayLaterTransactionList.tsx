import ModalShowTransaction from '$components/ModalShowTransaction';
import OneTransaction from '$components/OneTransaction';
import { DeviceContext } from '$context/DeviceContext';
import { useSubscription } from '@apollo/client';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { addMerchant, editPayLaterTransaction } from '../graphql/mutation';
import { getAllMerchant } from '../graphql/query';
import {
  merchantSubscription,
  payLaterTransactionLive,
} from '../graphql/subscription';

interface IData {
  mutationType: 'ADD' | 'EDIT';
  transaction: IGetAllPayLaterTransaction;
}

interface IPayLaterTransactionList {
  payLaterTransactions: IGetAllPayLaterTransaction[];
  payLaterAccountId: string;
  token: string;
}

const PayLaterTransactionList: React.FC<IPayLaterTransactionList> = ({
  payLaterTransactions,
  payLaterAccountId,
  token,
}) => {
  const [payLaterTransaction, setPayLaterTransaction] =
    useState(payLaterTransactions);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<IGetAllPayLaterTransaction | null>(null);
  const { isDesktop } = useContext(DeviceContext);

  const { data } = useSubscription(payLaterTransactionLive, {
    variables: { payLaterAccountId },
  });

  useEffect(() => {
    if (data) {
      const { payLaterTransactionLive }: { payLaterTransactionLive: IData } =
        data;
      const { mutationType, transaction } = payLaterTransactionLive;

      if (mutationType === 'ADD') {
        const array = [transaction, ...payLaterTransaction];
        setPayLaterTransaction(array);
      }

      if (mutationType === 'EDIT') {
        const array = [...payLaterTransaction];
        const index = array.findIndex((item) => {
          return transaction.id === item.id;
        });
        array[index] = transaction;

        setPayLaterTransaction(array);
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
      {payLaterTransaction.map((value, index) => {
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
          accountType={'paylater'}
          onSaveEditFunction={editPayLaterTransaction}
          onAddMerchant={addMerchant}
          merchantSubscription={merchantSubscription}
          getAllMerchant={getAllMerchant}
        />
      )}
    </motion.div>
  );
};

export default PayLaterTransactionList;
