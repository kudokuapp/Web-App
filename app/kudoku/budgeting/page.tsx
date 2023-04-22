import ToastFC from '$components/ToastFC';
import EmptyBudgeting from '$lib/EmptyBudgeting';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllBudgeting } from './graphql_/query/getAllBudgeting';

export default async function Page() {
  const nextCookies = cookies();

  const token = nextCookies.get('token')?.value;
  if (!token) redirect('/login');

  const user_id = nextCookies.get('user_id')?.value;
  if (!user_id) redirect('/login');

  const budgeting = await getAllBudgeting(token);

  if (budgeting.length > 0) {
    return redirect(`/kudoku/budgeting/${budgeting[0].id}`);
  } else {
    return (
      <>
        <ToastFC />
        <EmptyBudgeting token={token} />
      </>
    );
  }
}
