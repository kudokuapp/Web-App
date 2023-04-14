import { IEditableTransaction } from '$components/ModalShowTransaction/index.d';
import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function editEWalletTransaction(
  token: string,
  transactionId: string,
  data: IEditableTransaction
): Promise<any> {
  const mutation = gql`
    mutation EditEWalletTransaction(
      $transactionId: String!
      $transactionName: String
      $merchantId: String
      $category: [NameAmountJsonInput]
      $notes: String
    ) {
      editEWalletTransaction(
        transactionId: $transactionId
        transactionName: $transactionName
        merchantId: $merchantId
        category: $category
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
          data: { editEWalletTransaction },
        } = await client.mutate({
          mutation,
          variables: {
            transactionId,
            transactionName: data.transactionName,
            merchantId: data.merchantId,
            category: data.category,
            notes: data.notes,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(editEWalletTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
