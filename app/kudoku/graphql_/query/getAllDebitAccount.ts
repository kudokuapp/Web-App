import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetAllDebitAccount {
  __typename: 'DebitAccount';
  institutionId: string;
  accountNumber: string;
  balance: string;
}

export async function getAllDebitAccount(
  token: string
): Promise<IGetAllDebitAccount[]> {
  const query = gql`
    query GetAllDebitAccount {
      getAllDebitAccount {
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
