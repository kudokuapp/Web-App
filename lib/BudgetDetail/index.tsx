'use client';

import CardHeader from '$components/CategoryPlan/CardHeader';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteBudgeting } from 'app/kudoku/budgeting/graphql_/mutation/deleteBudgeting';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import CategoryPlanList from './CategoryPlanList';

interface IClientProps {
  token: string;
  categoryPlan: ICategoryPlanProps[];
}

export interface ICategoryPlanProps {
  idCategoryPlan: string;
  budgetId: string;
  createdAt: string;
  lastUpdate: string;
  categoryId: string;
  tagId: string;
  amount: string;
  monthly: boolean;
}

export default function BudgetingDetail({
  token,
  categoryPlan,
  id,
  user_id,
}: {
  token: string;
  categoryPlan: ICategoryPlanProps[];
  id: string;
  user_id: string;
}) {
  const router = useRouter();
  const handleSubmitTransaction = () => {
    (async () => {
      try {
        await toast.promise(
          deleteBudgeting({
            token: token,
            budgetingId: id,
          }),
          {
            loading: 'Lagi menghapus budget lo...',
            success: 'Sukses menghapus budget!',
            error: 'Error menghapus budget!',
          }
        );
        router.push('/kudoku/budgeting');
      } catch (error) {
        console.error(error);
      }
    })();
  };
  return (
    <>
      <div className="flex gap-0 w-full h-fit flex-col overflow-x-auto items-start justify-start p-4 sm:pb-20 pb-10">
        <header className="flex flex-row justify-between border-b-2 py-2 border-neutral w-full items-center">
          <h2 className="text-primary dark:text-white font-bold text-2xl">
            Detail Budget
          </h2>
          <div className="flex flex-row gap-2">
            <button className="bg-transparent border-2 text-primary dark:text-white border-primary dark:border-white rounded-md px-2 py-1 text-sm">
              <FontAwesomeIcon icon={faPencil} size="sm" /> Edit budget
            </button>
            <button
              className="bg-transparent border-2 text-error dark:text-errorContainer border-error dark:border-errorContainer rounded-md px-2 py-1 text-sm"
              onClick={() => {
                handleSubmitTransaction();
              }}
            >
              <FontAwesomeIcon icon={faTrash} size="sm" />
            </button>
          </div>
        </header>
        <div className="dark:bg-onPrimaryDark bg-onPrimary dark:text-onPrimary text-onPrimaryContainer rounded-lg shadow-2xl my-2 w-full h-fit hover:cursor-pointer">
          <CardHeader token={token} id={id} user_id={user_id} />
          {categoryPlan.map((value, index) => {
            const {
              idCategoryPlan,
              budgetId,
              createdAt,
              lastUpdate,
              categoryId,
              tagId,
              amount,
              monthly,
            } = value;
            return (
              <CategoryPlanList
                token={token}
                categoryPlan={{
                  idCategoryPlan,
                  budgetId,
                  createdAt,
                  lastUpdate,
                  categoryId,
                  tagId,
                  amount,
                  monthly,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
