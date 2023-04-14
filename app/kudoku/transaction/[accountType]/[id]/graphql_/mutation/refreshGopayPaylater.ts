import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function refreshGopayPaylater({
  token,
  payLaterAccountId,
}: {
  token: string;
  payLaterAccountId: string;
}) {
  const mutation = gql`
    mutation RefreshGopayTransactionViaBrick($payLaterAccountId: String) {
      refreshGopayTransactionViaBrick(payLaterAccountId: $payLaterAccountId) {
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
            payLaterAccountId,
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
