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
} from '../graphql_/query';

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

export async function fetchAllAccounts(
  token: string
): Promise<IFetchAllAccounts[]> {
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
