import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function addBudgeting({
  budgetTypeId,
  budgetName,
  amount,
  token,
}: {
  budgetTypeId: string;
  budgetName: string;
  amount: string;
  token: string;
}) {
  const mutation = gql`
    mutation AddBudgeting(
      $budgetTypeId: BudgetTypeEnum!
      $budgetName: String!
      $amount: String!
    ) {
      addBudgeting(
        budgetTypeId: $budgetTypeId
        budgetName: $budgetName
        amount: $amount
      ) {
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
          data: { addBudgeting },
        } = await client.mutate({
          mutation,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          variables: { budgetTypeId, budgetName, amount },
        });
        resolve(addBudgeting);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
