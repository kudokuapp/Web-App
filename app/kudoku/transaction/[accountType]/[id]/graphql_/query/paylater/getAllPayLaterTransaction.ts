import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function getAllPayLaterTransaction(
  token: string,
  payLaterAccountId: string
): Promise<IGetAllPayLaterTransaction[]> {
  const query = gql`
    query GetAllPayLaterTransaction($payLaterAccountId: String!) {
      getAllPayLaterTransaction(payLaterAccountId: $payLaterAccountId) {
        id
        transactionName
        payLaterAccountId
        dateTimestamp
        referenceId
        institutionId
        currency
        amount
        onlineTransaction
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
        description
        internalTransferTransactionId
        direction
        isSubscription
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
          data: { getAllPayLaterTransaction },
        } = await client.query({
          query,
          variables: { payLaterAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllPayLaterTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
