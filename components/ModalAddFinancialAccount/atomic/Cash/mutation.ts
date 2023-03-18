import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IAddCashAccount {
  __typename: 'CashAccount';
  id: string;
}

export async function addCashAccount({
  accountName,
  displayPicture,
  startingBalance,
  currency,
  token,
}: {
  accountName: string;
  displayPicture: string | null;
  startingBalance: string;
  currency: 'IDR';
  token: string;
}): Promise<IAddCashAccount> {
  const mutation = gql`
    mutation AddCashAccount(
      $accountName: String!
      $displayPicture: String
      $startingBalance: String!
      $currency: String!
    ) {
      addCashAccount(
        accountName: $accountName
        displayPicture: $displayPicture
        startingBalance: $startingBalance
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
          data: { addCashAccount },
        } = await client.mutate({
          mutation,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          variables: { accountName, displayPicture, startingBalance, currency },
        });
        resolve(addCashAccount);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
