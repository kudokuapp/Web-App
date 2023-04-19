import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetInfoEWalletAccount {
  brickAccessToken: string;
}

export async function getInfoEWalletAccount(
  token: string,
  eWalletAccountId: string
): Promise<IGetInfoEWalletAccount> {
  const query = gql`
    query GetInfoEWalletAccount($eWalletAccountId: String!) {
      getInfoEWalletAccount(eWalletAccountId: $eWalletAccountId) {
        brickAccessToken
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getInfoEWalletAccount },
        } = await client.query({
          query,
          variables: {
            eWalletAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getInfoEWalletAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
