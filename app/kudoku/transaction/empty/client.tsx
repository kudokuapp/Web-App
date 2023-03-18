'use client';

import { ModalAddFinancialAccount } from '$components/ModalAddFinancialAccount';
import TheImage from '$public/decor/web-exploring.svg';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function Client({ token }: { token: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.section
      className="w-full h-[100vh] flex flex-col justify-center items-center gap-4 sm:p-0 p-4"
      animate={{ opacity: 1 }}
    >
      <Image src={TheImage} alt="" quality={100} />

      <section className="flex flex-col gap-8">
        <section className="flex flex-col justify-center items-center text-onPrimaryContainer dark:text-surfaceVariant gap-2 text-center">
          <p>Kudoku gak menemukan transaksi kamu.</p>

          <p>Nampaknya kamu belum connect atau nambahin akun finansial kamu.</p>

          <p>Yuk tambahin akun finansial kamu!</p>
        </section>

        <button
          className="font-bold text-onPrimary dark:text-onPrimaryDark bg-primary dark:bg-primaryDark sm:px-6 sm:py-3 sm:text-xl sm:rounded-lg px-2.5 py-2 text-lg rounded-md shadow-2xl flex gap-2 items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faPlusCircle} size="xl" />
          Tambah Akun Finansial
        </button>

        {isOpen && (
          <ModalAddFinancialAccount
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
            token={token}
          />
        )}
      </section>
    </motion.section>
  );
}
