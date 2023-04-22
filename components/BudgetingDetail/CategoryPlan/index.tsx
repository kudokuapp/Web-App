'use client';

import { motion } from 'framer-motion';
import CategoryPlanCard from './CategoryPlanCard';
import type { IOneCategoryPlanCard } from './index.d';

const OneCategoryPlanCard: React.FC<IOneCategoryPlanCard> = ({
  token,
  categoryPlan,
}) => {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
    >
      <div className="flex flex-col gap-4 items-start justify-start px-4 min-w-[300px]">
        <div className="flex flex-col justify-between w-full">
          <CategoryPlanCard
            cookies={{
              token: token,
              categoryPlan: {
                idCategoryPlan: categoryPlan.idCategoryPlan,
                budgetId: categoryPlan.budgetId,
                createdAt: categoryPlan.createdAt,
                lastUpdate: categoryPlan.lastUpdate,
                categoryId: categoryPlan.categoryId,
                tagId: categoryPlan.tagId,
                amount: categoryPlan.amount,
                monthly: categoryPlan.monthly,
              },
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
    </motion.div>
  );
};

export default OneCategoryPlanCard;
