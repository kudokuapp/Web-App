import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetAllBudgeting {
  __typename: 'Budgeting';
  id: string;
  userId: string;
  createdAt: string;
  lastUpdate: string;
  budgetTypeId: string;
  budgetName: string;
  amount: string;
  latestBudgeting: string | null;
}

export async function getAllBudgeting(
  token: string
): Promise<IGetAllBudgeting[]> {
  const query = gql`
    query GetAllBudgeting {
      getAllBudgeting {
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
          data: { getAllBudgeting },
        } = await client.query({
          query,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getAllBudgeting);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
