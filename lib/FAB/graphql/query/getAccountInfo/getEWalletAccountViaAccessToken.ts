import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetEWalletAccountViaAccessToken {
  id: string;
}

export async function getEWalletAccountViaAccessToken(
  token: string,
  accessToken: string
): Promise<IGetEWalletAccountViaAccessToken> {
  const query = gql`
    query GetEWalletAccountViaBrickAccessToken($accessToken: String!) {
      getEWalletAccountViaBrickAccessToken(accessToken: $accessToken) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getEWalletAccountViaBrickAccessToken },
        } = await client.query({
          query,
          variables: {
            accessToken,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getEWalletAccountViaBrickAccessToken);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
