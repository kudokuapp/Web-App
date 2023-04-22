import ToastFC from '$components/ToastFC';
import BudgetingDetail from '$lib/BudgetDetail';
import BudgetingCard from '$lib/BudgetingCard';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllBudgeting } from '../graphql_/query/getAllBudgeting';
import { getAllCategoryPlan } from '../graphql_/query/getAllCategoryPlan';

export default async function Page({ params }: { params: { id: string } }) {
  const nextCookies = cookies();

  const token = nextCookies.get('token')?.value;
  if (!token) redirect('/login');

  const user_id = nextCookies.get('user_id')?.value;
  if (!user_id) redirect('/login');

  const budgeting = await getAllBudgeting(token);
  const categoryPlan = await getAllCategoryPlan(token, params.id);
  return (
    <>
      <ToastFC />
      <section className="min-h-[100vh] h-full w-full flex flex-row">
        <BudgetingCard token={token} budgeting={budgeting} />
        <div className=" w-2/3 border-l-2 border-neutral">
          <BudgetingDetail
            token={token}
            categoryPlan={categoryPlan}
            id={params.id}
            user_id={user_id}
          />
        </div>
      </section>
    </>
  );
}
