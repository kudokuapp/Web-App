import { getAllCategoryPlan } from 'app/kudoku/budgeting/graphql_/query/getAllCategoryPlan';
import { useEffect, useState } from 'react';
import AmountLeft from './AmountLeft';
import CompareAmount from './CompareAmount';
import ProgressBar from './ProgressBar';

interface IGetCategoryPlanCard {
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
    categoryPlan?: IGetCategoryPlanCard[];
  };
}

export default function CategoryPlanCard(props: Props) {
  const [categoryPlan, setCategoryPlan] = useState<IGetCategoryPlanCard[]>([]);

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

  return (
    <>
      <CompareAmount
        cookies={{
          budgetAmount: budgetAmount,
          categoryPlan: categoryPlan,
        }}
      />
      <ProgressBar
        cookies={{
          budgetAmount: budgetAmount,
          categoryPlan: categoryPlan,
        }}
      />
      <AmountLeft
        cookies={{
          budgetAmount: budgetAmount,
          categoryPlan: categoryPlan,
        }}
      />
    </>
  );
}
