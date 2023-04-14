import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetAllEWalletAccount {
  __typename: 'EWalletAccount';
  id: string;
  institutionId: string;
  accountNumber: string;
  balance: string;
  createdAt: string;
  expired: boolean;
}

export async function getAllEWalletAccount(
  token: string
): Promise<IGetAllEWalletAccount[]> {
  const query = gql`
    query GetAllEWalletAccount {
      getAllEWalletAccount {
        id
        institutionId
        accountNumber
        balance
        createdAt
        expired
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllEWalletAccount },
        } = await client.query({
          query,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getAllEWalletAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
