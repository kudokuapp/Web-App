import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function addEMoneyTransaction({
  token,
  eMoneyAccountId,
  transactionName,
  amount,
  merchantId,
  category,
  transactionType,
  institutionId,
  notes,
}: {
  token: string;
  eMoneyAccountId: string;
  transactionName: string;
  amount: string;
  merchantId: string;
  category: { name: string; amount: string }[];
  transactionType: 'INCOME' | 'EXPENSE';
  institutionId: string;
  notes: string | null;
}): Promise<any> {
  const mutation = gql`
    mutation AddEMoneyTransaction(
      $eMoneyAccountId: String!
      $transactionName: String!
      $amount: String!
      $merchantId: String!
      $category: [NameAmountJsonInput]!
      $transactionType: String!
      $direction: DirectionTypeEnum!
      $institutionId: String!
      $notes: String
    ) {
      addEMoneyTransaction(
        eMoneyAccountId: $eMoneyAccountId
        transactionName: $transactionName
        amount: $amount
        merchantId: $merchantId
        category: $category
        transactionType: $transactionType
        direction: $direction
        institutionId: $institutionId
        notes: $notes
      ) {
        id
      }
    }
  `;

  const direction = transactionType === 'INCOME' ? 'IN' : 'OUT';

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { addCashTransaction },
        } = await client.mutate({
          mutation,
          variables: {
            eMoneyAccountId,
            transactionName,
            amount,
            merchantId,
            category,
            transactionType,
            institutionId,
            notes,
            direction,
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
