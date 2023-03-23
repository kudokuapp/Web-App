import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function addMerchant({
  token,
  name,
  url,
}: {
  token: string;
  name: string;
  url: string;
}): Promise<any> {
  const mutation = gql`
    mutation AddMerchant($name: String!, $url: String!, $picture: String!) {
      addMerchant(name: $name, url: $url, picture: $picture) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { addMerchant },
        } = await client.mutate({
          mutation,
          variables: {
            name,
            url,
            picture: 'NO',
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(addMerchant);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
