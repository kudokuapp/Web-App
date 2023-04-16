import { IMerchant } from '$components/SearchMerchant/index.d';
import client from '$utils/graphql';
import { gql } from '@apollo/client';
import { NameAmount } from 'global';

export async function addEMoneyTransaction(
  token: string,
  accountId: string,
  _accountType: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney',
  transactionType: string | undefined,
  transactionName: string | undefined,
  transactionAmount: string | undefined,
  category: NameAmount[] | undefined,
  merchant: IMerchant | undefined,
  institutionId: string | undefined
): Promise<{ __typename: string; id: string }> {
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
      $description: String
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
        description: $description
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
          data: { addEMoneyTransaction },
        } = await client.mutate({
          mutation,
          variables: {
            eMoneyAccountId: accountId,
            transactionName,
            transactionType,
            amount: transactionAmount,
            category,
            merchantId: merchant.id,
            direction: transactionType === 'INCOME' ? 'IN' : 'OUT',
            institutionId,
            description: `${transactionName.toUpperCase()} ON ${accountId.toUpperCase()}`,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(addEMoneyTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
