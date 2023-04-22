import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function deleteBudgeting({
  budgetingId,
  token,
}: {
  budgetingId: string;
  token: string;
}) {
  const mutation = gql`
    mutation DeleteBudgeting($budgetingId: String!) {
      deleteBudgeting(budgetingId: $budgetingId) {
        response
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { deleteBudgeting },
        } = await client.mutate({
          mutation,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          variables: { budgetingId },
        });
        resolve(deleteBudgeting);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
