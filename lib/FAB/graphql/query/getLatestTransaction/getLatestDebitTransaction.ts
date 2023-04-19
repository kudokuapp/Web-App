import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetLatestDebitTransaction {
  dateTimestamp: string;
  referenceId: string;
}

export async function getLatestDebitTransaction(
  token: string,
  debitAccountId: string
): Promise<IGetLatestDebitTransaction> {
  const query = gql`
    query GetDebitLatestTransaction($debitAccountId: String!) {
      getDebitLatestTransaction(debitAccountId: $debitAccountId) {
        dateTimestamp
        referenceId
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getDebitLatestTransaction },
        } = await client.query({
          query,
          variables: {
            debitAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getDebitLatestTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
