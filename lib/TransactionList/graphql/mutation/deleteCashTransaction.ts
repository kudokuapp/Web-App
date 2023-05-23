import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function deleteCashTransaction(
  token: string,
  transactionId: string
): Promise<any> {
  const mutation = gql`
    mutation DeleteCashTransaction($transactionId: String!) {
      deleteCashTransaction(transactionId: $transactionId) {
        response
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { deleteCashTransaction },
        } = await client.mutate({
          mutation,
          variables: {
            transactionId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(deleteCashTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
