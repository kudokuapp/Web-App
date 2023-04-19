import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetInfoDebitAccount {
  brickAccessToken: string;
}

export async function getInfoDebitAccount(
  token: string,
  debitAccountId: string
): Promise<IGetInfoDebitAccount> {
  const query = gql`
    query GetInfoDebitAccount($debitAccountId: String!) {
      getInfoDebitAccount(debitAccountId: $debitAccountId) {
        brickAccessToken
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getInfoDebitAccount },
        } = await client.query({
          query,
          variables: {
            debitAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getInfoDebitAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
