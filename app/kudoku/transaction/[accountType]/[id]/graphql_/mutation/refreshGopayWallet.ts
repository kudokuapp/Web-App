import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function refreshGopayWallet({
  token,
  eWalletAccountId,
}: {
  token: string;
  eWalletAccountId: string;
}) {
  const mutation = gql`
    mutation RefreshGopayTransactionViaBrick($eWalletAccountId: String) {
      refreshGopayTransactionViaBrick(eWalletAccountId: $eWalletAccountId) {
        response
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { refreshGopayTransactionViaBrick },
        } = await client.mutate({
          mutation,
          variables: {
            eWalletAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(refreshGopayTransactionViaBrick);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
