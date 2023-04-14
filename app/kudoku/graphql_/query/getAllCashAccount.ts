import client from '$utils/graphql';
import { gql } from '@apollo/client';

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
          fetchPolicy: 'network-only',
        });

        resolve(getAllCashAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
