// Hardcoded url
import axios from 'axios';
import { redirect } from 'next/navigation';
import Client from './client';

async function fetchUser(id: string) {
  const host =
    process.env.NODE_ENV === 'production'
      ? 'https://app.kudoku.id'
      : `http://localhost:3000`;

  const url = new URL('/api/mongodb/checkuserbyid', host);

  try {
    const res = await axios.get(url.href, {
      params: {
        id,
      },
    });
    const { data } = res;
    return data;
  } catch (e) {
    console.error(e);
  }
}

/*
 The correct type should be 
 { searchParams }: { searchParams: { id: string }}
 But the above type failed during build
*/

// eslint-disable-next-line no-unused-vars
export default async function Page({ params }: any) {
  const { id } = params;
  if (!id) redirect('/login');

  const user = await fetchUser(id);
  if (!user || user.username !== '') redirect('/login');

  return (
    <section className="flex flex-col gap-4">
      <Client user={user} />
    </section>
  );
}
