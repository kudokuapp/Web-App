'use client';
import { ModalAddTransaction } from '$components/ModalAddTransaction';
import EmptyData from '$public/splash_screens/emptyData.svg';
import { authLinkToken, httpLink } from '$utils/graphql';
import { useLazyQuery } from '@apollo/client';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { queryAllCashAccount, queryAllDebitAccount } from '../query';
import SummaryCash from './cash/summary';
import SummaryDebit from './debit/summary';
import DebitTransaction from './debit/transaction-list';
import TransactionList from './transaction-list';

export default function Client() {
  const token = getCookie('token') as string;
  const searchParamsName = useSearchParams().get('cashAccount');
  const searchParamsNameDebit = useSearchParams().get('debitAccount');
  const searchParamsID = useSearchParams().get('id');
  const [addTransaction, setIsAddTransaction] = useState(false);
  const [isTransactionEmpty, setIsTransactionEmpty] = useState(false);
  const [isTransactionDebitEmpty, setIsTransactionDebitEmpty] = useState(false);
  const [balanceCash, setBalanceCash] = useState('');
  const [cashAccount, { client }] = useLazyQuery(queryAllCashAccount);
  client.setLink(authLinkToken(token).concat(httpLink));
  const getAllCashAccount = () => {
    return new Promise((resolve, reject) => {
      cashAccount()
        .then((res: any) => {
          let length = res.data.getAllCashAccount.length;
          // console.log(length);
          let data = res.data.getAllCashAccount;
          let tmpBalanceCash = '';
          if (length > 0) {
            for (let i = 0; i < length; i++) {
              if (data[i].id === searchParamsID) {
                tmpBalanceCash = data[i].balance;
              }
            }
            setBalanceCash(tmpBalanceCash);
          } else if (length <= 0) {
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    getAllCashAccount();
  }, [searchParamsID]);

  const [accountDebitItems, setAccountDebitItems] = useState('');
  const [debitAccount] = useLazyQuery(queryAllDebitAccount);
  const getAllDebitAccount = () => {
    return new Promise((resolve, reject) => {
      debitAccount()
        .then((res: any) => {
          let length = res.data.getAllDebitAccount.length;
          let data = res.data.getAllDebitAccount;
          let balance = '';

          if (length > 0) {
            for (let i = 0; i < length; i++) {
              if (data[i].accountNumber === searchParamsNameDebit) {
                balance = data[i].balance;
              }
            }

            setAccountDebitItems(balance);
          }

          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    getAllDebitAccount();
  }, [searchParamsID]);
  return (
    <section className="flex bg-onPrimary dark:bg-onBackground dark:text-surfaceVariant h-screen">
      {searchParamsName ? (
        <>
          {isTransactionEmpty ? (
            <>
              <div className="flex flex-col items-center bg-onPrimary text-onSurfaceVariant dark:text-surfaceVariant dark:bg-onBackground align-middle justify-center h-screen w-screen">
                <Image
                  height={400}
                  src={EmptyData}
                  quality={100}
                  alt="Kudoku Logo"
                  draggable={false}
                />
                <h4>No tracked transactions available.</h4>
                <h4 className="my-4">
                  {' '}
                  <button
                    onClick={() => setIsAddTransaction((c: any) => !c)}
                    className="border-2 border-outline py-1 px-2 rounded-md hover:bg-primary hover:text-onPrimary"
                  >
                    + Add Transaction
                  </button>{' '}
                  to get started!
                </h4>
              </div>
            </>
          ) : (
            <>
              {' '}
              <TransactionList
                balanceCash={balanceCash}
                setIsAddTransaction={setIsAddTransaction}
                setIsTransactionEmpty={setIsTransactionEmpty}
              />
            </>
          )}
        </>
      ) : searchParamsNameDebit ? (
        <>
          <DebitTransaction accountDebitItems={accountDebitItems} />
        </>
      ) : (
        <>
          <div className="h-screen flex w-screen items-start p-10 justify-center">
            <div className="flex flex-col w-full gap-4">
              <h4 className="text-xl font-bold">Cash Account</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SummaryCash />
              </div>
              <h4 className="text-xl font-bold">Debit Account</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SummaryDebit />
              </div>
            </div>
          </div>
        </>
      )}
      {addTransaction ? (
        <ModalAddTransaction setIsAddTransaction={setIsAddTransaction} />
      ) : (
        <></>
      )}
    </section>
  );
}
