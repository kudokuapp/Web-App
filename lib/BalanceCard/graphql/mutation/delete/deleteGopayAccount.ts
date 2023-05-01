import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function deleteGopayAccount(
  token: string,
  eWalletAccountId: string
): Promise<any> {
  const mutation = gql`
    mutation DeleteGopayAccount($eWalletAccountId: String!) {
      deleteGopayAccount(eWalletAccountId: $eWalletAccountId) {
        response
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { deleteGopayAccount },
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

        resolve(deleteGopayAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
