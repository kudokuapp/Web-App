import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function getAllDebitTransaction(
  token: string,
  debitAccountId: string
): Promise<IGetAllDebitTransaction[]> {
  const query = gql`
    query GetAllDebitTransaction($debitAccountId: String!) {
      getAllDebitTransaction(debitAccountId: $debitAccountId) {
        amount
        category {
          amount
          name
        }
        id
        transactionName
        debitAccountId
        dateTimestamp
        referenceId
        institutionId
        currency
        onlineTransaction
        isReviewed
        merchantId
        transactionType
        description
        internalTransferTransactionId
        direction
        isSubscription
        notes
        isHideFromBudget
        isHideFromInsight
        transactionMethod
        merchant {
          id
          name
          picture
          url
        }
        location {
          latitude
          longitude
        }
        tags {
          name
          amount
        }
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllDebitTransaction },
        } = await client.query({
          query,
          variables: { debitAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllDebitTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
