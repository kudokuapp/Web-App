import EmptyTransaction from '$lib/EmptyTransaction';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getAllCashAccount,
  getAllDebitAccount,
  getAllEMoneyAccount,
  getAllEWalletAccount,
  getAllPayLaterAccount,
} from './_graphql/query';

export default async function Page() {
  const nextCookies = cookies();

  const token = nextCookies.get('token')?.value;
  if (!token) redirect('/login');

  const user_id = nextCookies.get('user_id')?.value;
  if (!user_id) redirect('/login');

  const cashAccount = await getAllCashAccount(token);
  const debitAccount = await getAllDebitAccount(token);
  const eWalletAccount = await getAllEWalletAccount(token);
  const eMoneyAccount = await getAllEMoneyAccount(token);
  const payLaterAccount = await getAllPayLaterAccount(token);

  if (cashAccount.length > 0) {
    return redirect(`/kudoku/transaction/cash/${cashAccount[0].id}`);
  } else if (debitAccount.length > 0) {
    return redirect(`/kudoku/transaction/debit/${debitAccount[0].id}`);
  } else if (eWalletAccount.length > 0) {
    return redirect(`/kudoku/transaction/ewallet/${eWalletAccount[0].id}`);
  } else if (eMoneyAccount.length > 0) {
    return redirect(`/kudoku/transaction/emoney/${eMoneyAccount[0].id}`);
  } else if (payLaterAccount.length > 0) {
    return redirect(`/kudoku/transaction/emoney/${eMoneyAccount[0].id}`);
  } else {
    return <EmptyTransaction token={token} />;
  }
}
