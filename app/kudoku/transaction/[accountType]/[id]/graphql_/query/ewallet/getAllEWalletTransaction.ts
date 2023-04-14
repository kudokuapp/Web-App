import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function getAllEWalletTransaction(
  token: string,
  eWalletAccountId: string
): Promise<IGetAllEWalletTransaction[]> {
  const query = gql`
    query GetAllEWalletTransaction($eWalletAccountId: String!) {
      getAllEWalletTransaction(eWalletAccountId: $eWalletAccountId) {
        id
        transactionName
        eWalletAccountId
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
          data: { getAllEWalletTransaction },
        } = await client.query({
          query,
          variables: { eWalletAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllEWalletTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
