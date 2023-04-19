import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function refreshGopayWalletViaKudokuxBrick(
  token: string,
  eWalletAccountId: string,
  transactionReferenceId: string,
  account: BrickAccountDetail,
  transaction: BrickTransactionData[]
): Promise<any> {
  const mutation = gql`
    mutation RefreshGopayWalletViaKudokuxBrick(
      $eWalletAccountId: String!
      $transactionReferenceId: String!
      $account: KudokuxBrickAccount!
      $transaction: [KudokuxBrickTransaction!]!
    ) {
      refreshGopayWalletViaKudokuxBrick(
        eWalletAccountId: $eWalletAccountId
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
          data: { refreshGopayWalletViaKudokuxBrick },
        } = await client.mutate({
          mutation,
          variables: {
            eWalletAccountId,
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

        resolve(refreshGopayWalletViaKudokuxBrick);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
