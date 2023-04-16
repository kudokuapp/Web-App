import { IMerchant } from '$components/SearchMerchant/index.d';
import client from '$utils/graphql';
import { gql } from '@apollo/client';
import { NameAmount } from 'global';

export async function addCashTransaction(
  token: string,
  accountId: string,
  _accountType: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney',
  transactionType: string,
  transactionName: string,
  transactionAmount: string,
  category: NameAmount[],
  merchant: IMerchant,
  _institutionId: string
): Promise<{ __typename: string; id: string }> {
  const mutation = gql`
    mutation AddCashTransaction(
      $cashAccountId: String!
      $transactionName: String!
      $amount: String!
      $merchantId: String!
      $category: [NameAmountJsonInput]!
      $transactionType: ExpenseTypeEnum!
      $direction: DirectionTypeEnum!
    ) {
      addCashTransaction(
        cashAccountId: $cashAccountId
        transactionName: $transactionName
        amount: $amount
        merchantId: $merchantId
        category: $category
        transactionType: $transactionType
        direction: $direction
      ) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    if (
      !transactionAmount ||
      !transactionName ||
      !transactionType ||
      !category ||
      !merchant
    )
      throw new Error('Value is undefined');

    (async () => {
      try {
        const {
          data: { addCashTransaction },
        } = await client.mutate({
          mutation,
          variables: {
            cashAccountId: accountId,
            transactionName,
            transactionType,
            amount: transactionAmount,
            category,
            merchantId: merchant.id,
            direction: transactionType === 'INCOME' ? 'IN' : 'OUT',
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
