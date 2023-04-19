import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function refreshGopayPayLaterViaKudokuxBrick(
  token: string,
  payLaterAccountId: string,
  transactionReferenceId: string,
  account: BrickAccountDetail,
  transaction: BrickTransactionData[]
): Promise<any> {
  const mutation = gql`
    mutation RefreshGopayPayLaterViaKudokuxBrick(
      $payLaterAccountId: String!
      $transactionReferenceId: String!
      $account: KudokuxBrickAccount!
      $transaction: [KudokuxBrickTransaction!]!
    ) {
      refreshGopayPayLaterViaKudokuxBrick(
        payLaterAccountId: $payLaterAccountId
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
          data: { refreshGopayPayLaterViaKudokuxBrick },
        } = await client.mutate({
          mutation,
          variables: {
            payLaterAccountId,
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

        resolve(refreshGopayPayLaterViaKudokuxBrick);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
