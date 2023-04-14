import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetAllPayLaterAccount {
  __typename: 'PayLaterAccount';
  institutionId: string;
  accountNumber: string;
  balance: string;
}

export async function getAllPayLaterAccount(
  token: string
): Promise<IGetAllPayLaterAccount[]> {
  const query = gql`
    query GetAllPayLaterAccount {
      getAllPayLaterAccount {
        institutionId
        accountNumber
        balance
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
