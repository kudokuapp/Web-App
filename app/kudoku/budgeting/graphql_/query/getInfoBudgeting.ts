import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetInfoBudgeting {
  __typename: 'Budgeting';
  id: string;
  userId: string;
  createdAt: string;
  lastUpdate: string;
  budgetTypeId: string;
  budgetName: string;
  amount: string;
}

export async function getInfoBudgeting(
  token: string,
  budgetTypeId: string
): Promise<IGetInfoBudgeting> {
  const query = gql`
    query GetInfoBudgeting($budgetTypeId: String!) {
      getInfoBudgeting(budgetTypeId: $budgetTypeId) {
        id
        userId
        createdAt
        lastUpdate
        budgetTypeId
        budgetName
        amount
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getInfoBudgeting },
        } = await client.query({
          query,
          variables: { budgetTypeId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getInfoBudgeting);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
