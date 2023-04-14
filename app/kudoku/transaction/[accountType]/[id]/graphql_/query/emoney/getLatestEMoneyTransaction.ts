import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetLatestEMoneyTransaction {
  __typename: 'EMoneyTransaction';
  dateTimestamp: string;
}

export async function getLatestEMoneyTransaction(
  token: string,
  eMoneyAccountId: string
): Promise<IGetLatestEMoneyTransaction> {
  const query = gql`
    query GetAllEMoneyTransaction($eMoneyAccountId: String!) {
      getAllEMoneyTransaction(eMoneyAccountId: $eMoneyAccountId) {
        dateTimestamp
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllEMoneyTransaction },
        } = await client.query({
          query,
          variables: { eMoneyAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getAllEMoneyTransaction[0]);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
