import client from '$utils/graphql';
import { gql } from '@apollo/client';

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
          fetchPolicy: 'network-only',
        });

        resolve(getAllCashTransaction[0]);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
