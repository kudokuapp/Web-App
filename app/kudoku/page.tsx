import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Page() {
  const nextCookies = cookies();

  const token = nextCookies.get('token')?.value;
  if (!token) redirect('/login');

  const user_id = nextCookies.get('user_id')?.value;
  if (!user_id) redirect('/login');

  return redirect('/kudoku/transaction');
}
