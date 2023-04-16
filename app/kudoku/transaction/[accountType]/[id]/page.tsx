import ToastFC from '$components/ToastFC';
import BalanceCard from '$lib/BalanceCard';
import EmptyTransaction from '$lib/EmptyTransaction';
import { FAB } from '$lib/FAB';
import TransactionList from '$lib/TransactionList';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchAllAccounts } from './functions_';
import {
  getAllCashTransaction,
  getAllDebitTransaction,
  getAllEMoneyTransaction,
  getAllEWalletTransaction,
  getAllPayLaterTransaction,
} from './graphql_/query';

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

  const accounts = await fetchAllAccounts(token);

  const institutionId = accounts.filter(
    (v) => v.type === params.accountType && v.id === params.id
  )[0].institutionId;

  return (
    <>
      <ToastFC />

      <BalanceCard accounts={accounts} token={token} />

      <TransactionList
        accountType={params.accountType}
        token={token}
        allTransaction={transaction}
        id={params.id}
      />

      <FAB
        token={token}
        accountType={params.accountType}
        accountId={params.id}
        institutionId={institutionId}
      />

      {transaction.length === 0 && (
        <EmptyTransaction type={params.accountType} />
      )}
    </>
  );
}
