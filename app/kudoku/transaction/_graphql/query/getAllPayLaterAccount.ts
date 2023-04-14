import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetAllPayLaterAccount {
  __typename: 'PayLaterAccount';
  id: string;
}

export async function getAllPayLaterAccount(
  token: string
): Promise<IGetAllPayLaterAccount[]> {
  const query = gql`
    query GetAllPayLaterAccount {
      getAllPayLaterAccount {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllPayLaterAccount },
        } = await client.query({
          query,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getAllPayLaterAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
