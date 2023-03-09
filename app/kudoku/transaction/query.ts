import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetAllCashAccount {
  __typename: 'CashAccount';
  id: string;
}

export async function getAllCashAccount(
  token: string
): Promise<IGetAllCashAccount[]> {
  const query = gql`
    query GetAllCashAccount {
      getAllCashAccount {
        id
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
  id: string;
}

export async function getAllDebitAccount(
  token: string
): Promise<IGetAllDebitAccount[]> {
  const query = gql`
    query GetAllDebitAccount {
      getAllDebitAccount {
        id
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
  id: string;
}

export async function getAllEWalletAccount(
  token: string
): Promise<IGetAllEWalletAccount[]> {
  const query = gql`
    query GetAllEWalletAccount {
      getAllEWalletAccount {
        id
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
  id: string;
}

export async function getAllEMoneyAccount(
  token: string
): Promise<IGetAllEMoneyAccount[]> {
  const query = gql`
    query GetAllEMoneyAccount {
      getAllEMoneyAccount {
        id
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
