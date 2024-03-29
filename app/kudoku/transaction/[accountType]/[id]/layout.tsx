import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

  return (
    <section className="min-h-[100vh] w-full flex flex-col sm:p-10 p-4">
      <main className="w-full h-fit">{children}</main>
    </section>
  );
}
