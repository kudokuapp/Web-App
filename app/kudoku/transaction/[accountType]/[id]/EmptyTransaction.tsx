'use client';

import TheImage from '$public/decor/web-exploring.svg';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const EmptyTransaction = ({
  type,
}: {
  type: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney';
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (type === 'cash' || type === 'emoney') {
    return (
      <motion.section
        className="w-full h-full flex flex-col justify-center items-center gap-4 sm:p-0 p-4"
        animate={{ opacity: 1 }}
      >
        <Image src={TheImage} alt="" quality={100} />

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
            Tambah Akun Finansial
          </button>

          {isOpen && <p>Pler</p>}
        </section>
      </motion.section>
    );
  } else {
    return (
      <motion.section
        className="w-full h-full flex flex-col justify-center items-center gap-4 sm:p-0 p-4"
        animate={{ opacity: 1 }}
      >
        <Image src={TheImage} alt="" quality={100} />

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

          {isOpen && <p>Pler</p>}
        </section>
      </motion.section>
    );
  }
};

export default EmptyTransaction;