import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function deleteDebitAccount(
  token: string,
  debitAccountId: string
): Promise<any> {
  const mutation = gql`
    mutation DeleteDebitAccount($debitAccountId: String!) {
      deleteDebitAccount(debitAccountId: $debitAccountId) {
        response
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { deleteDebitAccount },
        } = await client.mutate({
          mutation,
          variables: {
            debitAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(deleteDebitAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
