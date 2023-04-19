import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetPayLaterAccountViaAccessToken {
  id: string;
}

export async function getPayLaterAccountViaAccessToken(
  token: string,
  accessToken: string
): Promise<IGetPayLaterAccountViaAccessToken> {
  const query = gql`
    query GetPayLaterAccountViaBrickAccessToken($accessToken: String!) {
      getPayLaterAccountViaBrickAccessToken(accessToken: $accessToken) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getPayLaterAccountViaBrickAccessToken },
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

        resolve(getPayLaterAccountViaBrickAccessToken);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
