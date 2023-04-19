import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function updateEWalletAccountExpiry(
  token: string,
  eWalletAccountId: string
): Promise<any> {
  const mutation = gql`
    mutation UpdateEWalletAccountExpiry(
      $eWalletAccountId: String!
      $expired: Boolean!
    ) {
      updateEWalletAccountExpiry(
        eWalletAccountId: $eWalletAccountId
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
          data: { updateEWalletAccountExpiry },
        } = await client.mutate({
          mutation,
          variables: {
            eWalletAccountId,
            expired: true,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(updateEWalletAccountExpiry);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
