import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetAllEMoneyAccount {
  __typename: 'EMoneyAccount';
  id: string;
}

export async function getAllEMoneyAccount(
  token: string
): Promise<IGetAllEMoneyAccount[]> {
  const query = gql`
    query GetAllEMoneyAccount {
      getAllEMoneyAccount {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllEMoneyAccount },
        } = await client.query({
          query,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getAllEMoneyAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
