import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetInfoPayLaterAccount {
  brickAccessToken: string;
}

export async function getInfoPayLaterAccount(
  token: string,
  payLaterAccountId: string
): Promise<IGetInfoPayLaterAccount> {
  const query = gql`
    query GetInfoPayLaterAccount($payLaterAccountId: String!) {
      getInfoPayLaterAccount(payLaterAccountId: $payLaterAccountId) {
        brickAccessToken
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getInfoPayLaterAccount },
        } = await client.query({
          query,
          variables: {
            payLaterAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getInfoPayLaterAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
