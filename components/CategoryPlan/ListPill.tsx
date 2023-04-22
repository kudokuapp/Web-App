import { getAllCategoryPlan } from 'app/kudoku/budgeting/graphql_/query/getAllCategoryPlan';
import { useEffect, useState } from 'react';

interface IGetListPill {
  idCategoryPlan: string;
  budgetId: string;
  createdAt: string;
  lastUpdate: string;
  categoryId: string;
  tagId: string;
  amount: string;
  monthly: boolean;
}

interface Props {
  cookies: {
    token?: string;
    user_id?: string;
    budgetId?: string;
    budgetAmount?: string;
  };
}

export default function ListPill(props: Props) {
  const [categoryPlan, setCategoryPlan] = useState<IGetListPill[]>([]);

  const { token, user_id, budgetId, budgetAmount } = props.cookies;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategoryPlan(
        token as string,
        budgetId as string
      );
      setCategoryPlan(data);
    };
    if (token && user_id) {
      fetchData();
    }
  }, [budgetId, token, user_id]);

  const Total = categoryPlan.reduce(
    (prevValue, currentValue) =>
      Number(prevValue) + Number(currentValue.amount),
    0
  );

  const Left = Number(budgetAmount) - Total;

  return (
    <>
      <div className="flex gap-2 flex-row h-fit overflow-x-auto items-start justify-start">
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
            <div
              className="rounded-2xl w-fit text-xs"
              style={{
                backgroundColor: `#${Math.floor(
                  Math.random() * 16777215
                ).toString(16)}`,
              }}
            >
              {categoryId.slice(0, 6)}
            </div>
          );
        })}
      </div>
    </>
  );
}
