'use client';

import CategoryPlanCard from '$components/CategoryPlan';
import ListPill from '$components/CategoryPlan/ListPill';
import { motion } from 'framer-motion';
import moment from 'moment';
import Link from 'next/link';
import type { IOneBudgetingCard } from './index.d';

const OneBudgetingCard: React.FC<IOneBudgetingCard> = ({
  isSelected,
  selectedAccountRef = undefined,
  onClick,
  budgeting,
  link,
  token,
  user_id,
  budgetId,
}) => {
  return (
    <motion.div
      ref={isSelected ? selectedAccountRef : null}
      className={` ${
        isSelected
          ? 'dark:bg-onPrimaryDark bg-onPrimary border-4 border-onPrimaryDark dark:border-onPrimary'
          : 'dark:bg-onPrimaryDark bg-onPrimary'
      } dark:text-onPrimary text-onPrimaryContainer rounded-lg shadow-2xl my-2 w-full h-fit hover:cursor-pointer`}
      onClick={onClick}
      whileTap={{ scale: !isSelected ? 0.95 : 1 }}
      whileHover={{ scale: !isSelected ? 1.02 : 1 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
    >
      <Link href={link} passHref>
        <div className="flex flex-col gap-4 items-start justify-start p-4 min-w-[300px]">
          <div className="flex flex-col justify-between w-full">
            <div className="font-bold text-center text-lg mb-2">
              {budgeting.budgetName}
            </div>
            <CategoryPlanCard
              cookies={{
                token: token,
                user_id: user_id,
                budgetId: budgeting.id,
                budgetAmount: budgeting.amount,
              }}
            />
            <div className="flex flex-row gap-2 justify-center items-center my-2">
              <div className="text-sm">Dibuat:</div>
              <div className="font-bold text-sm text-center">
                {moment(budgeting.createdAt).format('dddd, D MMMM YYYY')}
              </div>
            </div>
            <ListPill
              cookies={{
                token: token,
                user_id: user_id,
                budgetId: budgeting.id,
                budgetAmount: budgeting.amount,
              }}
            />
          </div>
          <div className="flex flex-col gap-2 items-start justify-start">
            {/* <p className="text-2xl font-medium">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(Number(account.balance))}
            </p>
            <div className="flex flex-col gap-0 items-start justify-start">
              <p className="text-sm">
                Transaksi terkahir:{' '}
                {account.latestTransaction
                  ? moment(account.latestTransaction).format('DD MMMM YYYY')
                  : 'Belum ada transaksi'}
              </p>
              <p className="text-sm">
                Akun dibuat: {moment(account.createdAt).format('DD MMMM YYYY')}
              </p>
            </div> */}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default OneBudgetingCard;
