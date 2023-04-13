import { IMyAccount } from '$lib/Sidebar/atomic/Desktop';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Client from './client';
import {
  getAllCashAccount,
  getAllDebitAccount,
  getAllEMoneyAccount,
  getAllEWalletAccount,
  getKudosInfo,
} from './query';

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

  const accounts = await fetchAllAccounts(token);
  const kudos = await getKudosInfo(user_id);

  return (
    <Client accounts={accounts} kudosNo={kudos.kudosNo}>
      {children}
    </Client>
  );
}

async function fetchAllAccounts(token: string): Promise<IMyAccount[]> {
  const allAccounts = [];

  const cashAccount = await getAllCashAccount(token);
  if (cashAccount.length > 0) {
    for (let i = 0; i < cashAccount.length; i++) {
      const element = cashAccount[i];

      const obj = {
        type: 'Cash',
        institutionId: 'Cash',
        accountNumber: element.accountName,
        balance: element.balance,
      } as IMyAccount;

      allAccounts.push(obj);
    }
  }

  const debitAccount = await getAllDebitAccount(token);
  if (debitAccount.length > 0) {
    for (let i = 0; i < debitAccount.length; i++) {
      const element = debitAccount[i];

      const obj = {
        type: 'Debit',
        institutionId: element.institutionId,
        accountNumber: element.accountNumber,
        balance: element.balance,
      } as IMyAccount;

      allAccounts.push(obj);
    }
  }

  const eWalletAccount = await getAllEWalletAccount(token);
  if (eWalletAccount.length > 0) {
    for (let i = 0; i < eWalletAccount.length; i++) {
      const element = eWalletAccount[i];

      const obj = {
        type: 'EWallet',
        institutionId: element.institutionId,
        accountNumber: element.accountNumber,
        balance: element.balance,
      } as IMyAccount;

      allAccounts.push(obj);
    }
  }

  const eMoneyAccount = await getAllEMoneyAccount(token);
  if (eMoneyAccount.length > 0) {
    for (let i = 0; i < eMoneyAccount.length; i++) {
      const element = eMoneyAccount[i];

      const obj = {
        type: 'EMoney',
        institutionId: element.institutionId,
        accountNumber: element.cardNumber,
        balance: element.balance,
      } as IMyAccount;

      allAccounts.push(obj);
    }
  }

  return allAccounts;
}
