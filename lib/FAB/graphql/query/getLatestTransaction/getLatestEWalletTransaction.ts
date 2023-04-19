import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetLatestEWalletTransaction {
  dateTimestamp: string;
  referenceId: string;
}

export async function getLatestEWalletTransaction(
  token: string,
  eWalletAccountId: string
): Promise<IGetLatestEWalletTransaction> {
  const query = gql`
    query GetEWalletLatestTransaction($eWalletAccountId: String!) {
      getEWalletLatestTransaction(eWalletAccountId: $eWalletAccountId) {
        dateTimestamp
        referenceId
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getEWalletLatestTransaction },
        } = await client.query({
          query,
          variables: {
            eWalletAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getEWalletLatestTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
