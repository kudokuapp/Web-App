//Harcoded url
import axios from 'axios';
import { redirect } from 'next/navigation';
import Client from './client';

interface IDataPayload {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  whatsapp: string;
  registerdate: Date;
  invited: boolean;
}

async function fetchUser(wa: string) {
  let isKudos: boolean,
    result = {} as IDataPayload;
  const host =
    process.env.NODE_ENV === 'production'
      ? 'https://app.kudoku.id'
      : 'http://localhost:3000';

  const url = new URL('/api/postgres/checkkudos', host);
  try {
    const { data } = await axios.get(url.href, {
      params: {
        wa,
      },
    });

    Object.keys(data).length === 0 ? (isKudos = false) : (isKudos = true);

    result = data;
  } catch (e) {
    console.error(e);
    isKudos = false;
  }

  return { result, isKudos };
}

/*
 The correct type should be 
 { searchParams }: { searchParams: { wa: string }}
 But the above type failed during build
*/

// eslint-disable-next-line no-unused-vars
export default async function Page({ params }: any) {
  const { wa } = params;
  if (!wa) redirect('/login');

  const getKudos = await fetchUser(wa);
  const { result, isKudos } = getKudos;

  if (result.invited) redirect('/login');

  return (
    <>
      <Client kudos={isKudos} user={result} whatsapp={wa} />
    </>
  );
}
