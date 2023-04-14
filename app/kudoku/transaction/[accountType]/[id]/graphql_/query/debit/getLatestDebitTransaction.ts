import client from '$utils/graphql';
import { gql } from '@apollo/client';

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
          fetchPolicy: 'network-only',
        });

        resolve(getAllDebitTransaction[0]);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
