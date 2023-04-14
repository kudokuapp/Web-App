import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function addCashTransaction({
  token,
  cashAccountId,
  transactionName,
  amount,
  merchantId,
  category,
  transactionType,
  notes,
}: {
  token: string;
  cashAccountId: string;
  transactionName: string;
  amount: string;
  merchantId: string;
  category: { name: string; amount: string }[];
  transactionType: 'INCOME' | 'EXPENSE';
  notes: string | null;
}): Promise<any> {
  const direction = transactionType === 'INCOME' ? 'IN' : 'OUT';
  const mutation = gql`
    mutation AddCashTransaction(
      $cashAccountId: String!
      $transactionName: String!
      $amount: String!
      $merchantId: String!
      $category: [NameAmountJsonInput]!
      $transactionType: ExpenseTypeEnum!
      $direction: DirectionTypeEnum!
      $notes: String
    ) {
      addCashTransaction(
        cashAccountId: $cashAccountId
        transactionName: $transactionName
        amount: $amount
        merchantId: $merchantId
        category: $category
        transactionType: $transactionType
        direction: $direction
        notes: $notes
      ) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { addCashTransaction },
        } = await client.mutate({
          mutation,
          variables: {
            cashAccountId,
            transactionName,
            amount,
            merchantId,
            category,
            transactionType,
            direction,
            notes,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(addCashTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
