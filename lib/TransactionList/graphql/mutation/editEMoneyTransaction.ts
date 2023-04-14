import { IEditableTransaction } from '$components/ModalShowTransaction/index.d';
import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function editEMoneyTransaction(
  token: string,
  transactionId: string,
  data: IEditableTransaction
): Promise<any> {
  const mutation = gql`
    mutation EditEMoneyTransaction(
      $transactionId: String!
      $transactionName: String
      $merchantId: String
      $category: [NameAmountJsonInput]
      $notes: String
    ) {
      editEMoneyTransaction(
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
          data: { editEMoneyTransaction },
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

        resolve(editEMoneyTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
