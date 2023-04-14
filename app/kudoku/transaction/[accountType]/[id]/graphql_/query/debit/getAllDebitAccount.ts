import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetAllDebitAccount {
  __typename: 'DebitAccount';
  id: string;
  institutionId: string;
  accountNumber: string;
  balance: string;
  createdAt: string;
  expired: boolean;
}

export async function getAllDebitAccount(
  token: string
): Promise<IGetAllDebitAccount[]> {
  const query = gql`
    query GetAllDebitAccount {
      getAllDebitAccount {
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
          data: { getAllDebitAccount },
        } = await client.query({
          query,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getAllDebitAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
