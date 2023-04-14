import client from '$utils/graphql';
import { gql } from '@apollo/client';

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
          fetchPolicy: 'network-only',
        });

        resolve(getAllPayLaterTransaction[0]);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
