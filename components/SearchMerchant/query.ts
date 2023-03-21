import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetAllMerchant {
  id: string;
  name: string;
}

export async function getAllMerchant(
  token: string
): Promise<IGetAllMerchant[]> {
  const query = gql`
    query GetAllMerchant {
      getAllMerchant {
        id
        name
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllMerchant },
        } = await client.query({
          query,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllMerchant);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
