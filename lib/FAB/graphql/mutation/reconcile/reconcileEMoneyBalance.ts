import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function reconcileEMoneyBalance(
  token: string,
  newBalance: string,
  eMoneyAccountId: string
): Promise<any> {
  const mutation = gql`
    mutation ReconcileEMoneyAccount(
      $newBalance: String!
      $eMoneyAccountId: String!
    ) {
      reconcileEMoneyAccount(
        newBalance: $newBalance
        eMoneyAccountId: $eMoneyAccountId
      ) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { reconcileEMoneyAccount },
        } = await client.mutate({
          mutation,
          variables: {
            newBalance,
            eMoneyAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(reconcileEMoneyAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
