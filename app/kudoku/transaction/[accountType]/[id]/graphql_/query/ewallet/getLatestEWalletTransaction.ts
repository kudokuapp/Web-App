import client from '$utils/graphql';
import { gql } from '@apollo/client';

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
          fetchPolicy: 'network-only',
        });

        resolve(getAllEWalletTransaction[0]);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
