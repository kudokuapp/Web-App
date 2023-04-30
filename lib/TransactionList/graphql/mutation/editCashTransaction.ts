import { IEditableTransaction } from '$components/ModalShowTransaction/index.d';
import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function editCashTransaction(
  token: string,
  transactionId: string,
  data: IEditableTransaction
): Promise<any> {
  const mutation = gql`
    mutation EditCashTransaction(
      $transactionId: String!
      $transactionName: String
      $merchantId: String
      $category: [NameAmountJsonInput]
      $notes: String
    ) {
      editCashTransaction(
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
          data: { editCashTransaction },
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

        resolve(editCashTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
