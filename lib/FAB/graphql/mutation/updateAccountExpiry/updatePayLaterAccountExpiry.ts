import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function updatePayLaterAccountExpiry(
  token: string,
  payLaterAccountId: string
): Promise<any> {
  const mutation = gql`
    mutation UpdatePayLaterAccountExpiry(
      $payLaterAccountId: String!
      $expired: Boolean!
    ) {
      updatePayLaterAccountExpiry(
        payLaterAccountId: $payLaterAccountId
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
          data: { updatePayLaterAccountExpiry },
        } = await client.mutate({
          mutation,
          variables: {
            payLaterAccountId,
            expired: true,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(updatePayLaterAccountExpiry);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
