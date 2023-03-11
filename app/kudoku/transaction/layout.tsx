import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getAllCashAccount,
  getAllDebitAccount,
  getAllEMoneyAccount,
  getAllEWalletAccount,
  getLatestCashTransaction,
  getLatestDebitTransaction,
  getLatestEMoneyTransaction,
  getLatestEWalletTransaction,
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

  // const accounts = await fetchAllAccounts(token);

  return (
    <section className="min-h-[100vh] w-full flex flex-col sm:p-10 p-4">
      {/* <Client accounts={accounts} /> */}
      {children}
    </section>
  );
}

export interface IFetchAllAccounts {
  type: 'Cash' | 'Debit' | 'EWallet' | 'EMoney';
  id: ObjectId | string;
  institutionId: 'Cash' | ObjectId | string;
  accountNumber: string;
  balance: string;
  createdAt: string;
  latestTransaction: string | null;
}

async function fetchAllAccounts(token: string): Promise<IFetchAllAccounts[]> {
  const allAccounts = [];

  const cashAccount = await getAllCashAccount(token);
  if (cashAccount.length > 0) {
    for (let i = 0; i < cashAccount.length; i++) {
      const element = cashAccount[i];

      const latestTransaction = await getLatestCashTransaction(
        token,
        element.id
      );

      const obj = {
        type: 'Cash',
        id: element.id,
        institutionId: 'Cash',
        accountNumber: element.accountName,
        balance: element.balance,
        createdAt: element.createdAt,
        latestTransaction: latestTransaction
          ? latestTransaction.dateTimestamp
          : null,
      } as IFetchAllAccounts;

      allAccounts.push(obj);
    }
  }

  const debitAccount = await getAllDebitAccount(token);
  if (debitAccount.length > 0) {
    for (let i = 0; i < debitAccount.length; i++) {
      const element = debitAccount[i];

      const latestTransaction = await getLatestDebitTransaction(
        token,
        element.id
      );

      const obj = {
        type: 'Debit',
        id: element.id,
        institutionId: element.institutionId,
        accountNumber: element.accountNumber,
        balance: element.balance,
        createdAt: element.createdAt,
        latestTransaction: latestTransaction
          ? latestTransaction.dateTimestamp
          : null,
      } as IFetchAllAccounts;

      allAccounts.push(obj);
    }
  }

  const eWalletAccount = await getAllEWalletAccount(token);
  if (eWalletAccount.length > 0) {
    for (let i = 0; i < eWalletAccount.length; i++) {
      const element = eWalletAccount[i];

      const latestTransaction = await getLatestEWalletTransaction(
        token,
        element.id
      );

      const obj = {
        type: 'EWallet',
        id: element.id,
        institutionId: element.institutionId,
        accountNumber: element.accountNumber,
        balance: element.balance,
        createdAt: element.createdAt,
        latestTransaction: latestTransaction
          ? latestTransaction.dateTimestamp
          : null,
      } as IFetchAllAccounts;

      allAccounts.push(obj);
    }
  }

  const eMoneyAccount = await getAllEMoneyAccount(token);
  if (eMoneyAccount.length > 0) {
    for (let i = 0; i < eMoneyAccount.length; i++) {
      const element = eMoneyAccount[i];

      const latestTransaction = await getLatestEMoneyTransaction(
        token,
        element.id
      );

      const obj = {
        type: 'EMoney',
        id: element.id,
        institutionId: element.institutionId,
        accountNumber: element.cardNumber,
        balance: element.balance,
        createdAt: element.createdAt,
        latestTransaction: latestTransaction
          ? latestTransaction.dateTimestamp
          : null,
      } as IFetchAllAccounts;

      allAccounts.push(obj);
    }
  }

  return allAccounts;
}
