import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function editCashAccount(
  token: string,
  cashAccountId: string,
  accountName: string
): Promise<any> {
  const mutation = gql`
    mutation EditCashAccount($cashAccountId: String!, $accountName: String) {
      editCashAccount(
        cashAccountId: $cashAccountId
        accountName: $accountName
      ) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { editCashAccount },
        } = await client.mutate({
          mutation,
          variables: {
            cashAccountId,
            accountName,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(editCashAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
