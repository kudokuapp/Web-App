'use client';

import ModalAddTransaction from '$components/ModalAddTransaction';
import { IMerchant } from '$components/SearchMerchant/index.d';
import { addCashTransaction, addMerchant } from '$lib/FAB/graphql/mutation';
import { getAllMerchant } from '$lib/FAB/graphql/query';
import { merchantSubscription } from '$lib/FAB/graphql/subscription';
import TheImage from '$public/decor/web-exploring.svg';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { NameAmount } from 'global';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const EmptyTransaction = ({
  type,
  token,
  id,
}: {
  type: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney';
  token: any;
  id: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmitTransaction = (
    _token: string,
    _accountId: string,
    accountType: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney',
    _transactionType: string,
    _transactionName: string,
    _transactionAmount: string,
    _category: NameAmount[],
    _merchant: IMerchant,
    _institutionId: string
  ) => {
    (async () => {
      try {
        if (accountType === 'cash') {
          toast.promise(
            addCashTransaction(
              _token,
              _accountId,
              accountType,
              _transactionType,
              _transactionName,
              _transactionAmount,
              _category,
              _merchant,
              'cash'
            ),
            {
              loading: 'Lagi nambahin transaksimu...',
              success: 'Sukses menambahkan transaksi!',
              error: 'Error menambahkan transaksi!',
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  if (type === 'cash' || type === 'emoney') {
    return (
      <motion.section
        className="w-full h-full flex flex-col justify-center items-center gap-4 sm:p-0 p-4"
        animate={{ opacity: 1 }}
      >
        <Image src={TheImage} alt="" quality={100} height={500} width={500} />

        <section className="flex flex-col gap-8">
          <section className="flex flex-col justify-center items-center text-onPrimaryContainer dark:text-surfaceVariant gap-2 text-center">
            <p>Kamu belum nambahin transaksi kamu.</p>

            <p>Yuk tambah transaksi pertama kamu!</p>
          </section>

          <button
            className="font-bold text-onPrimary dark:text-onPrimaryDark bg-primary dark:bg-primaryDark sm:px-6 sm:py-3 sm:text-xl sm:rounded-lg px-2.5 py-2 text-lg rounded-md shadow-2xl flex gap-2 items-center justify-center"
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faPlusCircle} size="xl" />
            Tambah Transaksi
          </button>

          <ModalAddTransaction
            token={token}
            accountId={id}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onAddMerchant={addMerchant}
            merchantSubscription={merchantSubscription}
            getAllMerchant={getAllMerchant}
            accountType={'cash'}
            onSubmit={handleSubmitTransaction}
            institutionId={'cash'}
          />
        </section>
      </motion.section>
    );
  } else {
    return (
      <motion.section
        className="w-full h-full flex flex-col justify-center items-center gap-4 sm:p-0 p-4"
        animate={{ opacity: 1 }}
      >
        <Image src={TheImage} alt="" quality={100} height={500} width={500} />

        <section className="flex flex-col gap-8">
          <section className="flex flex-col justify-center items-center text-onPrimaryContainer dark:text-surfaceVariant gap-2 text-center">
            <p>Kudoku gak menemukan transaksi kamu.</p>

            <p>Nampaknya kamu belum pernah bertransaksi di akun ini.</p>

            <p>Kalo udah, yuk tinggal refresh transaksinya!</p>
          </section>

          <button
            className="font-bold text-onPrimary dark:text-onPrimaryDark bg-primary dark:bg-primaryDark sm:px-6 sm:py-3 sm:text-xl sm:rounded-lg px-2.5 py-2 text-lg rounded-md shadow-2xl flex gap-2 items-center justify-center"
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faPlusCircle} size="xl" />
            Refresh Transaction
          </button>

          <ModalAddTransaction
            token={token}
            accountId={id}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onAddMerchant={addMerchant}
            merchantSubscription={merchantSubscription}
            getAllMerchant={getAllMerchant}
            accountType={'cash'}
            onSubmit={handleSubmitTransaction}
            institutionId={'cash'}
          />
        </section>
      </motion.section>
    );
  }
};

export default EmptyTransaction;
