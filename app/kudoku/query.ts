import client from '$utils/graphql';
import createUrl from '$utils/helper/createUrl';
import { gql } from '@apollo/client';
import axios from 'axios';

interface IGetAllCashAccount {
  __typename: 'CashAccount';
  accountName: string;
  balance: string;
}

export async function getAllCashAccount(
  token: string
): Promise<IGetAllCashAccount[]> {
  const query = gql`
    query GetAllCashAccount {
      getAllCashAccount {
        accountName
        balance
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

interface IGetAllDebitAccount {
  __typename: 'DebitAccount';
  institutionId: string;
  accountNumber: string;
  balance: string;
}

export async function getAllDebitAccount(
  token: string
): Promise<IGetAllDebitAccount[]> {
  const query = gql`
    query GetAllDebitAccount {
      getAllDebitAccount {
        institutionId
        accountNumber
        balance
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

interface IGetAllEWalletAccount {
  __typename: 'EWalletAccount';
  institutionId: string;
  accountNumber: string;
  balance: string;
}

export async function getAllEWalletAccount(
  token: string
): Promise<IGetAllEWalletAccount[]> {
  const query = gql`
    query GetAllEWalletAccount {
      getAllEWalletAccount {
        institutionId
        accountNumber
        balance
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

interface IGetAllEMoneyAccount {
  __typename: 'EMoneyAccount';
  institutionId: string;
  cardNumber: string;
  balance: string;
}

export async function getAllEMoneyAccount(
  token: string
): Promise<IGetAllEMoneyAccount[]> {
  const query = gql`
    query GetAllEMoneyAccount {
      getAllEMoneyAccount {
        institutionId
        cardNumber
        balance
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

export async function getKudosInfo(userId: string): Promise<MongoDBUserData> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.get(
          createUrl('/api/mongodb/checkuserbyid').href,
          {
            params: {
              id: userId,
            },
          }
        );

        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
