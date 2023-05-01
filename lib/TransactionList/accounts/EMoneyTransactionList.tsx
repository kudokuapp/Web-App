import ModalShowTransaction from '$components/ModalShowTransaction';
import OneTransaction from '$components/OneTransaction';
import { DeviceContext } from '$context/DeviceContext';
import { useSubscription } from '@apollo/client';
import { motion } from 'framer-motion';
import moment from 'moment';
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

  const groups = eMoneyTransaction.reduce((groups: any, transaction: any) => {
    const date = moment(transaction.dateTimestamp).format('DD MMM YY');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});

  const groupsByMonth = eMoneyTransaction.reduce(
    (groups: any, transaction: any) => {
      const date = moment(transaction.dateTimestamp).format('MMMM YYYY');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {}
  );

  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      transactions: groups[date],
    };
  });

  // Edit: to add it in the array format instead
  const groupArraysByMonth = Object.keys(groupsByMonth).map((date) => {
    return {
      date,
      transactions: groupsByMonth[date],
    };
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
      {groupArraysByMonth.map((groupByMonth: any) => {
        return (
          <>
            <div className="flex flex-row justify-between items-center dark:text-surfaceVariant text-onPrimaryContainer">
              <div className="flex flex-col items-start">
                <h3 className="text-2xl">{groupByMonth.date}</h3>
                <h3 className="text-sm">
                  {groupByMonth.transactions.length} Transaksi
                </h3>
              </div>
              <div className="flex flex-col items-end">
                <h3 className="text-sm">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  }).format(
                    Number(
                      groupByMonth.transactions
                        .filter((item: any) => item.direction === 'OUT')
                        .reduce(
                          (acc: any, o: any) => acc + parseInt(o.amount),
                          0
                        )
                    )
                  )}
                </h3>
                <h3 className="text-sm">Total pengeluaran</h3>
              </div>
            </div>
            {groupArrays.map((item: any) => {
              return (
                <>
                  <h3 className="text-onPrimaryContainer p-2 bg-onPrimary rounded">
                    {item.date}
                  </h3>
                  {item.transactions.map((value: any, index: any) => {
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
                </>
              );
            })}
          </>
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
