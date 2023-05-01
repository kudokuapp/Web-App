import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function editEMoneyAccount(
  token: string,
  eMoneyAccountId: string,
  cardNumber: string | null,
  institutionId: string | null
): Promise<any> {
  const mutation = gql`
    mutation EditEMoneyAccount(
      $eMoneyAccountId: String!
      $institutionId: String
      $cardNumber: String
    ) {
      editEMoneyAccount(
        eMoneyAccountId: $eMoneyAccountId
        institutionId: $institutionId
        cardNumber: $cardNumber
      ) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { editEMoneyAccount },
        } = await client.mutate({
          mutation,
          variables: {
            eMoneyAccountId,
            cardNumber,
            institutionId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(editEMoneyAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
