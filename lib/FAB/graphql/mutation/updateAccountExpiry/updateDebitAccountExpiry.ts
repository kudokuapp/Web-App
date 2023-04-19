import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function updateDebitAccountExpiry(
  token: string,
  debitAccountId: string
): Promise<any> {
  const mutation = gql`
    mutation UpdateDebitAccountExpiry(
      $debitAccountId: String!
      $expired: Boolean!
    ) {
      updateDebitAccountExpiry(
        debitAccountId: $debitAccountId
        expired: $expired
      ) {
        response
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { updateDebitAccountExpiry },
        } = await client.mutate({
          mutation,
          variables: {
            debitAccountId,
            expired: true,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(updateDebitAccountExpiry);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
