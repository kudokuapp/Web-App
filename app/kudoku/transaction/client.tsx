'use client';
import { ModalAddTransaction } from '$components/ModalAddTransaction';
import EmptyData from '$public/splash_screens/emptyData.svg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import TransactionList from './transaction-list';

export default function Client() {
  const searchParamsName = useSearchParams().get('cashAccount');
  const [addTransaction, setIsAddTransaction] = useState(false);
  const [isTransactionEmpty, setIsTransactionEmpty] = useState(false);
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
                setIsAddTransaction={setIsAddTransaction}
                setIsTransactionEmpty={setIsTransactionEmpty}
              />
            </>
          )}
        </>
      ) : (
        <>
          <div className="h-screen flex w-screen items-center justify-center">
            <h1>Transaction Page</h1>
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
