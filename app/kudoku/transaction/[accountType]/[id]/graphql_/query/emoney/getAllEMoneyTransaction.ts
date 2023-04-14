import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function getAllEMoneyTransaction(
  token: string,
  eMoneyAccountId: string
): Promise<IGetAllEMoneyTransaction[]> {
  const query = gql`
    query GetAllEMoneyTransaction($eMoneyAccountId: String!) {
      getAllEMoneyTransaction(eMoneyAccountId: $eMoneyAccountId) {
        id
        transactionName
        eMoneyAccountId
        dateTimestamp
        institutionId
        currency
        amount
        isReviewed
        merchant {
          id
          name
          picture
          url
        }
        merchantId
        category {
          name
          amount
        }
        transactionType
        internalTransferTransactionId
        description
        direction
        notes
        location {
          latitude
          longitude
        }
        tags {
          name
          amount
        }
        isHideFromBudget
        isHideFromInsight
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
        });

        resolve(getAllEMoneyTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
