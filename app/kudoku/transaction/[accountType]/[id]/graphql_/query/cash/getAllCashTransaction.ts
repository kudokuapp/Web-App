import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function getAllCashTransaction(
  token: string,
  cashAccountId: string
): Promise<IGetAllCashTransaction[]> {
  const query = gql`
    query GetAllCashTransaction($cashAccountId: String!) {
      getAllCashTransaction(cashAccountId: $cashAccountId) {
        id
        transactionName
        cashAccountId
        dateTimestamp
        currency
        amount
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
          data: { getAllCashTransaction },
        } = await client.query({
          query,
          variables: { cashAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllCashTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
