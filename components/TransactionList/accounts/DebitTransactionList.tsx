import ModalShowTransaction, {
  ModalShowTransactionMobile,
} from '$components/ModalShowTransaction';
import OneTransaction from '$components/OneTransaction';
import { DeviceContext } from '$context/DeviceContext';
import { gql, useSubscription } from '@apollo/client';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';

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

  const subscription = gql`
    subscription DebitTransactionLive($debitAccountId: String!) {
      debitTransactionLive(debitAccountId: $debitAccountId) {
        mutationType
        transaction {
          id
          transactionName
          debitAccountId
          dateTimestamp
          referenceId
          institutionId
          currency
          amount
          onlineTransaction
          isReviewed
          merchant {
            id
            name
            picture
            url
          }
          merchantId
          category {
            name
            amount
          }
          transactionType
          description
          internalTransferTransactionId
          direction
          isSubscription
          notes
          location {
            latitude
            longitude
          }
          tags {
            name
            amount
          }
          isHideFromBudget
          isHideFromInsight
          transactionMethod
        }
      }
    }
  `;

  const { data } = useSubscription(subscription, {
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

      {selectedTransaction && isDesktop && (
        <ModalShowTransaction
          transaction={selectedTransaction}
          onCloseModal={() => {
            setSelectedTransaction(null);
            setModalIsOpen(false);
          }}
          isOpen={modalIsOpen}
          token={token}
          accountType={'debit'}
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
          accountType={'debit'}
        />
      )}
    </motion.div>
  );
};

export default DebitTransactionList;
