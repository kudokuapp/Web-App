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

  const subscription = gql`
    subscription EWalletTransactionLive($eWalletAccountId: String!) {
      eWalletTransactionLive(eWalletAccountId: $eWalletAccountId) {
        mutationType
        transaction {
          id
          transactionName
          eWalletAccountId
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
        }
      }
    }
  `;

  const { data } = useSubscription(subscription, {
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

      {selectedTransaction && isDesktop && (
        <ModalShowTransaction
          transaction={selectedTransaction}
          onCloseModal={() => {
            setSelectedTransaction(null);
            setModalIsOpen(false);
          }}
          isOpen={modalIsOpen}
          token={token}
          accountType={'ewallet'}
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
          accountType={'ewallet'}
        />
      )}
    </motion.div>
  );
};

export default EWalletTransactionList;
