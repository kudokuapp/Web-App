import BalanceCard from '$components/BalanceCard';
import TransactionList from '$components/TransactionList';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AddTransaction } from './client';
import EmptyTransaction from './EmptyTransaction';
import {
  getAllCashAccount,
  getAllDebitAccount,
  getAllEMoneyAccount,
  getAllEWalletAccount,
  getAllPayLaterAccount,
  getLatestCashTransaction,
  getLatestDebitTransaction,
  getLatestEMoneyTransaction,
  getLatestEWalletTransaction,
  getLatestPayLaterTransaction,
} from './fetchAllAccountsQuery';
import {
  getAllCashTransaction,
  getAllDebitTransaction,
  getAllEMoneyTransaction,
  getAllEWalletTransaction,
  getAllPayLaterTransaction,
} from './pageQuery';

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

  // const renderTransactionList = () => {
  //   if (params.accountType === 'cash') {
  //     const trans = transaction as IGetAllCashTransaction[];
  //     return (
  //       <CashTransactionList
  //         cashTransactions={trans}
  //         cashAccountId={trans[0].cashAccountId}
  //         token={token}
  //       />
  //     );
  //   } else {
  //     return <></>;
  //   }
  // };

  return (
    <>
      <BalanceCard accounts={accounts} token={token} />
      {/* <TransactionList
        transactions={transaction}
        token={token}
        accountType={params.accountType}
      /> */}

      {/* {renderTransactionList()} */}

      <TransactionList
        accountType={params.accountType}
        token={token}
        allTransaction={transaction}
        id={params.id}
      />

      <AddTransaction
        token={token}
        accountType={params.accountType}
        accountId={params.id}
      />

      {transaction.length === 0 && (
        <EmptyTransaction type={params.accountType} />
      )}
    </>
  );
}

interface IFetchAllAccounts {
  type: 'Cash' | 'Debit' | 'EWallet' | 'EMoney' | 'PayLater';
  id: string;
  institutionId: 'Cash' | string;
  accountNumber: string;
  balance: string;
  createdAt: string;
  latestTransaction: string | null;
  expired: boolean;
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
        expired: false,
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
        expired: element.expired,
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
        expired: element.expired,
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
        expired: false,
      } as IFetchAllAccounts;

      allAccounts.push(obj);
    }
  }

  const payLaterAccount = await getAllPayLaterAccount(token);
  if (payLaterAccount.length > 0) {
    for (let i = 0; i < payLaterAccount.length; i++) {
      const element = payLaterAccount[i];

      const latestTransaction = await getLatestPayLaterTransaction(
        token,
        element.id
      );

      const obj = {
        type: 'PayLater',
        id: element.id,
        institutionId: element.institutionId,
        accountNumber: element.accountNumber,
        balance: element.balance,
        createdAt: element.createdAt,
        latestTransaction: latestTransaction
          ? latestTransaction.dateTimestamp
          : null,
        expired: element.expired,
      } as IFetchAllAccounts;

      allAccounts.push(obj);
    }
  }

  return allAccounts;
}
