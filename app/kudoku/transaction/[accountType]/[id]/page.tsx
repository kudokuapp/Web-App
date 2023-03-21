import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import EmptyTransaction from './EmptyTransaction';
import {
  getAllCashTransaction,
  getAllDebitTransaction,
  getAllEMoneyTransaction,
  getAllEWalletTransaction,
  getAllPayLaterTransaction,
} from './query';
import TransactionList from './TransactionList';

export default async function Page({
  params,
}: {
  params: { id: string; accountType: string };
}) {
  const nextCookies = cookies();

  const token = nextCookies.get('token')?.value;
  if (!token) redirect('/login');

  const user_id = nextCookies.get('user_id')?.value;
  if (!user_id) redirect('/login');

  let transaction:
    | IGetAllCashTransaction[]
    | IGetAllDebitTransaction[]
    | IGetAllEWalletTransaction[]
    | IGetAllPayLaterTransaction[]
    | IGetAllEMoneyTransaction[];

  switch (params.accountType) {
    case 'cash':
      transaction = await getAllCashTransaction(token, params.id);
      break;

    case 'debit':
      transaction = await getAllDebitTransaction(token, params.id);
      break;

    case 'ewallet':
      transaction = await getAllEWalletTransaction(token, params.id);
      break;

    case 'paylater':
      transaction = await getAllPayLaterTransaction(token, params.id);
      break;

    case 'emoney':
      transaction = await getAllEMoneyTransaction(token, params.id);
      break;

    default:
      redirect('/kudoku');
  }
  return (
    <>
      <TransactionList transactions={transaction} token={token} />

      {transaction.length === 0 && (
        <EmptyTransaction type={params.accountType} />
      )}
    </>
  );
}
