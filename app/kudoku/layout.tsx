import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Client from './client';
import { getKudosInfo } from './_functions/getKudosInfo';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextCookies = cookies();

  const token = nextCookies.get('token')?.value;
  if (!token) redirect('/login');

  const user_id = nextCookies.get('user_id')?.value;
  if (!user_id) redirect('/login');

  // const accounts = await fetchAllAccounts(token);
  const kudos = await getKudosInfo(user_id);

  return (
    <Client accounts={[]} kudosNo={kudos.kudosNo}>
      {children}
    </Client>
  );
}
