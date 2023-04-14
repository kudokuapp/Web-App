import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function refreshBca({
  token,
  debitAccountId,
}: {
  token: string;
  debitAccountId: string;
}) {
  const mutation = gql`
    mutation RefreshBcaTransactionViaBrick($debitAccountId: String!) {
      refreshBcaTransactionViaBrick(debitAccountId: $debitAccountId) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { refreshBcaTransactionViaBrick },
        } = await client.mutate({
          mutation,
          variables: {
            debitAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(refreshBcaTransactionViaBrick);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
