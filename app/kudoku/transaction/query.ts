import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetAllCashAccount {
  __typename: 'CashAccount';
  id: string;
  accountName: string;
  balance: string;
  createdAt: string;
}

export async function getAllCashAccount(
  token: string
): Promise<IGetAllCashAccount[]> {
  const query = gql`
    query GetAllCashAccount {
      getAllCashAccount {
        id
        accountName
        balance
        createdAt
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllCashAccount },
        } = await client.query({
          query,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllCashAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

interface IGetLatestCashTransaction {
  __typename: 'CashTransaction';
  dateTimestamp: string;
}

export async function getLatestCashTransaction(
  token: string,
  cashAccountId: string
): Promise<IGetLatestCashTransaction> {
  const query = gql`
    query GetAllCashTransaction($cashAccountId: String!) {
      getAllCashTransaction(cashAccountId: $cashAccountId) {
        dateTimestamp
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllCashTransaction },
        } = await client.query({
          query,
          variables: { cashAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllCashTransaction[0]);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

interface IGetAllDebitAccount {
  __typename: 'DebitAccount';
  id: string;
  institutionId: string;
  accountNumber: string;
  balance: string;
  createdAt: string;
}

export async function getAllDebitAccount(
  token: string
): Promise<IGetAllDebitAccount[]> {
  const query = gql`
    query GetAllDebitAccount {
      getAllDebitAccount {
        id
        institutionId
        accountNumber
        balance
        createdAt
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllDebitAccount },
        } = await client.query({
          query,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllDebitAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

interface IGetLatestDebitTransaction {
  __typename: 'DebitTransaction';
  dateTimestamp: string;
}

export async function getLatestDebitTransaction(
  token: string,
  debitAccountId: string
): Promise<IGetLatestDebitTransaction> {
  const query = gql`
    query GetAllDebitTransaction($debitAccountId: String!) {
      getAllDebitTransaction(debitAccountId: $debitAccountId) {
        dateTimestamp
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllDebitTransaction },
        } = await client.query({
          query,
          variables: { debitAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllDebitTransaction[0]);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

interface IGetAllEWalletAccount {
  __typename: 'EWalletAccount';
  id: string;
  institutionId: string;
  accountNumber: string;
  balance: string;
  createdAt: string;
}

export async function getAllEWalletAccount(
  token: string
): Promise<IGetAllEWalletAccount[]> {
  const query = gql`
    query GetAllEWalletAccount {
      getAllEWalletAccount {
        id
        institutionId
        accountNumber
        balance
        createdAt
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllEWalletAccount },
        } = await client.query({
          query,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllEWalletAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

interface IGetLatestEWalletTransaction {
  __typename: 'EWalletTransaction';
  dateTimestamp: string;
}

export async function getLatestEWalletTransaction(
  token: string,
  eWalletAccountId: string
): Promise<IGetLatestEWalletTransaction> {
  const query = gql`
    query GetAllEWalletTransaction($eWalletAccountId: String!) {
      getAllEWalletTransaction(eWalletAccountId: $eWalletAccountId) {
        dateTimestamp
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllEWalletTransaction },
        } = await client.query({
          query,
          variables: { eWalletAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllEWalletTransaction[0]);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

interface IGetAllPayLaterAccount {
  __typename: 'PayLaterAccount';
  id: string;
  institutionId: string;
  accountNumber: string;
  balance: string;
  createdAt: string;
}

export async function getAllPayLaterAccount(
  token: string
): Promise<IGetAllPayLaterAccount[]> {
  const query = gql`
    query GetAllPayLaterAccount {
      getAllPayLaterAccount {
        id
        institutionId
        accountNumber
        balance
        createdAt
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllPayLaterAccount },
        } = await client.query({
          query,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllPayLaterAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

interface IGetLatestPayLaterTransaction {
  __typename: 'PayLaterTransaction';
  dateTimestamp: string;
}

export async function getLatestPayLaterTransaction(
  token: string,
  payLaterAccountId: string
): Promise<IGetLatestPayLaterTransaction> {
  const query = gql`
    query GetAllPayLaterTransaction($payLaterAccountId: String!) {
      getAllPayLaterTransaction(payLaterAccountId: $payLaterAccountId) {
        dateTimestamp
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllPayLaterTransaction },
        } = await client.query({
          query,
          variables: { payLaterAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllPayLaterTransaction[0]);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

interface IGetAllEMoneyAccount {
  __typename: 'EMoneyAccount';
  id: string;
  institutionId: string;
  cardNumber: string;
  balance: string;
  createdAt: string;
}

export async function getAllEMoneyAccount(
  token: string
): Promise<IGetAllEMoneyAccount[]> {
  const query = gql`
    query GetAllEMoneyAccount {
      getAllEMoneyAccount {
        id
        institutionId
        cardNumber
        balance
        createdAt
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllEMoneyAccount },
        } = await client.query({
          query,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllEMoneyAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

interface IGetLatestEMoneyTransaction {
  __typename: 'EMoneyTransaction';
  dateTimestamp: string;
}

export async function getLatestEMoneyTransaction(
  token: string,
  eMoneyAccountId: string
): Promise<IGetLatestEMoneyTransaction> {
  const query = gql`
    query GetAllEMoneyTransaction($eMoneyAccountId: String!) {
      getAllEMoneyTransaction(eMoneyAccountId: $eMoneyAccountId) {
        dateTimestamp
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllEMoneyTransaction },
        } = await client.query({
          query,
          variables: { eMoneyAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllEMoneyTransaction[0]);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
