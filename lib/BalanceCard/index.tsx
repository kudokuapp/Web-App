'use client';

import ModalAddFinancialAccount from '$lib/ModalAddFinancialAccount';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import CashBalance from './accounts/CashBalance';
import DebitBalance from './accounts/DebitBalance';
import EMoneyBalance from './accounts/EMoneyBalance';
import EWalletBalance from './accounts/EWalletBalance';
import PayLaterBalance from './accounts/PayLaterBalance';

interface IClientProps {
  accounts: IAccountsProps[];
  token: string;
}

export interface IAccountsProps {
  type: 'cash' | 'debit' | 'ewallet' | 'emoney' | 'paylater';
  id: string;
  institutionId: 'cash' | string;
  accountNumber: string;
  balance: string;
  createdAt: string;
  latestTransaction: string | null;
  expired: boolean;
}

export default function BalanceCard({ token, accounts }: IClientProps) {
  const pathname = usePathname();
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false);

  const createIdRegex = (id: string): RegExp => {
    const regexStr = `(.*)${id}(.*)`;
    return new RegExp(regexStr);
  };

  const selectedAccountIndex = accounts.findIndex(({ id }) =>
    createIdRegex(id as string).test(pathname as string)
  );
  const selectedAccountRef = useRef<HTMLDivElement>(null);

  const scrollToSelectedAccount = () => {
    if (selectedAccountRef.current) {
      selectedAccountRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };

  useEffect(() => {
    scrollToSelectedAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, selectedAccountRef]);

  const handleClick = () => {
    scrollToSelectedAccount();
  };

  return (
    <>
      <div className="flex gap-2 w-full h-fit overflow-x-auto items-start justify-start p-4 sm:pb-10 pb-10 balance-card mb-10">
        {accounts.map((value, index) => {
          const {
            accountNumber,
            balance,
            institutionId,
            type,
            id,
            latestTransaction,
            createdAt,
            expired,
          } = value;

          const isSelected = selectedAccountIndex === index;

          const link = `/kudoku/transaction/${type.toLowerCase()}/${id}`;

          if (type === 'cash') {
            return (
              <CashBalance
                key={index}
                link={link}
                isSelected={isSelected}
                selectedAccountRef={selectedAccountRef}
                onClick={() => {
                  handleClick();
                }}
                cashAccountId={id}
                account={{
                  institutionId,
                  accountNumber,
                  balance,
                  latestTransaction,
                  createdAt,
                  type,
                  expired,
                }}
              />
            );
          } else if (type === 'emoney') {
            return (
              <EMoneyBalance
                key={index}
                link={link}
                isSelected={isSelected}
                selectedAccountRef={selectedAccountRef}
                onClick={() => {
                  handleClick();
                }}
                eMoneyAccountId={id}
                account={{
                  institutionId,
                  accountNumber,
                  balance,
                  latestTransaction,
                  createdAt,
                  type,
                  expired,
                }}
              />
            );
          } else if (type === 'debit') {
            return (
              <DebitBalance
                key={index}
                link={link}
                isSelected={isSelected}
                selectedAccountRef={selectedAccountRef}
                onClick={() => {
                  handleClick();
                }}
                debitAccountId={id}
                account={{
                  institutionId,
                  accountNumber,
                  balance,
                  latestTransaction,
                  createdAt,
                  type,
                  expired,
                }}
              />
            );
          } else if (type === 'ewallet') {
            return (
              <EWalletBalance
                key={index}
                link={link}
                isSelected={isSelected}
                selectedAccountRef={selectedAccountRef}
                onClick={() => {
                  handleClick();
                }}
                eWalletAccountId={id}
                account={{
                  institutionId,
                  accountNumber,
                  balance,
                  latestTransaction,
                  createdAt,
                  type,
                  expired,
                }}
              />
            );
          } else if (type === 'paylater') {
            return (
              <PayLaterBalance
                key={index}
                link={link}
                isSelected={isSelected}
                selectedAccountRef={selectedAccountRef}
                onClick={() => {
                  handleClick();
                }}
                payLaterAccountId={id}
                account={{
                  institutionId,
                  accountNumber,
                  balance,
                  latestTransaction,
                  createdAt,
                  type,
                  expired,
                }}
              />
            );
          } else {
            return <></>;
          }
        })}

        <motion.button
          className={`flex flex-col gap-4 items-start justify-start rounded-lg shadow-2xl p-4 min-w-[300px] dark:bg-onPrimary bg-onPrimaryDark dark:text-onPrimaryContainer text-onPrimary h-[204px] py-14`}
          onClick={() => {
            setModalAddIsOpen(true);
          }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
        >
          <div className="flex flex-col justify-center items-center w-full h-fit text-xl gap-4">
            <FontAwesomeIcon icon={faPlusCircle} size="2xl" />
            <p>Tambah akun</p>
          </div>
        </motion.button>

        {modalAddIsOpen && (
          <ModalAddFinancialAccount
            isOpen={modalAddIsOpen}
            closeModal={() => {
              setModalAddIsOpen(false);
            }}
            token={token}
          />
        )}
      </div>
    </>
  );
}
