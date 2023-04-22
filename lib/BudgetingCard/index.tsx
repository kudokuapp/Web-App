'use client';

import ModalAddBudgeting from '$components/ModalAddBudget';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import MonthlyBudgeting from './types/monthly';

interface IClientProps {
  budgeting: IBudgetingProps[];
  token: string;
}

export interface IBudgetingProps {
  id: string;
  userId: string;
  createdAt: string;
  lastUpdate: string;
  budgetTypeId: string;
  budgetName: string;
  amount: string;
  latestBudgeting: string | null;
}

export default function BudgetingCard({ token, budgeting }: IClientProps) {
  const pathname = usePathname();
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false);

  const createIdRegex = (id: string): RegExp => {
    const regexStr = `(.*)${id}(.*)`;
    return new RegExp(regexStr);
  };

  const selectedAccountIndex = budgeting.findIndex(({ id }) =>
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
      <div className="flex gap-0 w-full max-h-screen flex-col overflow-y-auto items-start justify-start p-4 sm:pb-20 pb-10">
        <header className="flex flex-row border-b-2 border-neutral py-2 w-full">
          <h2 className="text-primary dark:text-white font-bold text-2xl">
            Budgeting
          </h2>
        </header>
        {budgeting.map((value, index) => {
          const {
            budgetName,
            amount,
            budgetTypeId,
            id,
            latestBudgeting,
            createdAt,
            lastUpdate,
            userId,
          } = value;

          const isSelected = selectedAccountIndex === index;

          const link = `/kudoku/budgeting/${id}`;
          return (
            <MonthlyBudgeting
              key={index}
              link={link}
              isSelected={isSelected}
              selectedAccountRef={selectedAccountRef}
              onClick={() => {
                handleClick();
              }}
              budgetTypeId={id}
              budgeting={{
                budgetName,
                amount,
                budgetTypeId,
                id,
                latestBudgeting,
                createdAt,
                lastUpdate,
                userId,
              }}
              token={token}
            />
          );
        })}

        <motion.button
          className={`flex flex-col gap-4 h-fit w-full items-start justify-start rounded-lg shadow-2xl p-4 min-w-[300px] dark:bg-onPrimary bg-onPrimaryDark dark:text-onPrimaryContainer text-onPrimary py-4 my-4`}
          onClick={() => {
            setModalAddIsOpen(true);
          }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
        >
          <div className="flex flex-col justify-center items-center w-full h-fit text-xl gap-4">
            <FontAwesomeIcon icon={faPlusCircle} size="2xl" />
            <p>Tambah Budget</p>
          </div>
        </motion.button>

        {modalAddIsOpen && (
          <ModalAddBudgeting
            isOpen={modalAddIsOpen}
            token={token}
            setIsOpen={setModalAddIsOpen}
          />
        )}
      </div>
    </>
  );
}
