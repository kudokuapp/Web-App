import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetAllCategoryPlan {
  __typename: 'CategoryPlan';
  idCategoryPlan: string;
  budgetId: string;
  createdAt: string;
  lastUpdate: string;
  categoryId: string;
  tagId: string;
  amount: string;
  monthly: boolean;
}

export async function getAllCategoryPlan(
  token: string,
  budgetId: string
): Promise<IGetAllCategoryPlan[]> {
  const query = gql`
    query GetAllCategoryPlan($budgetId: String!) {
      getAllCategoryPlan(budgetId: $budgetId) {
        id
        createdAt
        lastUpdate
        budgetId
        categoryId
        tagId
        monthly
        amount
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllCategoryPlan },
        } = await client.query({
          query,
          variables: { budgetId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getAllCategoryPlan);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
