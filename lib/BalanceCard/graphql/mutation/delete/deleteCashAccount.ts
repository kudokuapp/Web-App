import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function deleteCashAccount(
  token: string,
  cashAccountId: string
): Promise<any> {
  const mutation = gql`
    mutation DeleteCashAccount($cashAccountId: String!) {
      deleteCashAccount(cashAccountId: $cashAccountId) {
        response
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { deleteCashAccount },
        } = await client.mutate({
          mutation,
          variables: {
            cashAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(deleteCashAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
