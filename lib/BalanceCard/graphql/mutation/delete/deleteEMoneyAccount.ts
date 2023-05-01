import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function deleteEMoneyAccount(
  token: string,
  eMoneyAccountId: string
): Promise<any> {
  const mutation = gql`
    mutation DeleteEMoneyAccount($eMoneyAccountId: String!) {
      deleteEMoneyAccount(eMoneyAccountId: $eMoneyAccountId) {
        response
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { deleteEMoneyAccount },
        } = await client.mutate({
          mutation,
          variables: {
            eMoneyAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(deleteEMoneyAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
