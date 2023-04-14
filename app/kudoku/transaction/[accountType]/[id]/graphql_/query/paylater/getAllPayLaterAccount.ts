import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetAllPayLaterAccount {
  __typename: 'PayLaterAccount';
  id: string;
  institutionId: string;
  accountNumber: string;
  balance: string;
  createdAt: string;
  expired: boolean;
}

export async function getAllPayLaterAccount(
  token: string
): Promise<IGetAllPayLaterAccount[]> {
  const query = gql`
    query GetAllPayLaterAccount {
      getAllPayLaterAccount {
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
