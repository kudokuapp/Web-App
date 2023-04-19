import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function reconcileCashBalance(
  token: string,
  newBalance: string,
  cashAccountId: string
): Promise<any> {
  const mutation = gql`
    mutation ReconcileCashBalance(
      $newBalance: String!
      $cashAccountId: String!
    ) {
      reconcileCashBalance(
        newBalance: $newBalance
        cashAccountId: $cashAccountId
      ) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { reconcileCashBalance },
        } = await client.mutate({
          mutation,
          variables: {
            newBalance,
            cashAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(reconcileCashBalance);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
