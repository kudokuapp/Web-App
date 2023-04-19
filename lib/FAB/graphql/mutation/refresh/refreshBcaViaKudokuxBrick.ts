import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function refreshBcaViaKudokuxBrick(
  token: string,
  debitAccountId: string,
  transactionReferenceId: string,
  account: BrickAccountDetail,
  transaction: BrickTransactionData[]
): Promise<any> {
  const mutation = gql`
    mutation RefreshBcaViaKudokuxBrick(
      $debitAccountId: String!
      $transactionReferenceId: String!
      $account: KudokuxBrickAccount!
      $transaction: [KudokuxBrickTransaction!]!
    ) {
      refreshBcaViaKudokuxBrick(
        debitAccountId: $debitAccountId
        transactionReferenceId: $transactionReferenceId
        account: $account
        transaction: $transaction
      ) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { refreshBcaViaKudokuxBrick },
        } = await client.mutate({
          mutation,
          variables: {
            debitAccountId,
            transactionReferenceId,
            account,
            transaction,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(refreshBcaViaKudokuxBrick);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
