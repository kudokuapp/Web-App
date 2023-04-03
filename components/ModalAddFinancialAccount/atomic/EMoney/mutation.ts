import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IAddEMoneyAccount {
  __typename: 'EMoneyAccount';
  id: string;
}

export async function addEMoneyAccount({
  institutionId,
  cardNumber,
  initialBalance,
  token,
}: {
  institutionId: string;
  cardNumber: string;
  initialBalance: string;
  token: string;
}): Promise<IAddEMoneyAccount> {
  const mutation = gql`
    mutation CreateEMoneyAccount(
      $institutionId: String!
      $cardNumber: String!
      $initialBalance: String!
      $currency: String!
    ) {
      createEMoneyAccount(
        institutionId: $institutionId
        cardNumber: $cardNumber
        initialBalance: $initialBalance
        currency: $currency
      ) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { createEMoneyAccount },
        } = await client.mutate({
          mutation,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          variables: {
            institutionId,
            cardNumber,
            initialBalance,
            currency: 'IDR',
          },
        });
        resolve(createEMoneyAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
