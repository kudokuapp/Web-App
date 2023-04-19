import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetLatestPayLaterTransaction {
  dateTimestamp: string;
  referenceId: string;
}

export async function getLatestPayLaterTransaction(
  token: string,
  payLaterAccountId: string
): Promise<IGetLatestPayLaterTransaction> {
  const query = gql`
    query GetPayLaterLatestTransaction($payLaterAccountId: String!) {
      getPayLaterLatestTransaction(payLaterAccountId: $payLaterAccountId) {
        dateTimestamp
        referenceId
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getPayLaterLatestTransaction },
        } = await client.query({
          query,
          variables: {
            payLaterAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getPayLaterLatestTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
