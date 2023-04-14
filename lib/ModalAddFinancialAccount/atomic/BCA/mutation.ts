import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IAddBcaAccount {
  __typename: 'DebitAccount';
  id: string;
}

export async function addBcaAccount({
  token,
  account,
  transaction,
}: {
  token: string;
  account: BrickAccountDetail;
  transaction: BrickTransactionData[];
}): Promise<IAddBcaAccount> {
  const mutation = gql`
    mutation AddBcaViaKudokuxBrick(
      $account: KudokuxBrickAccount!
      $transaction: [KudokuxBrickTransaction!]
    ) {
      addBcaViaKudokuxBrick(account: $account, transaction: $transaction) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { addBcaViaKudokuxBrick },
        } = await client.mutate({
          mutation,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          variables: { account, transaction },
        });
        resolve(addBcaViaKudokuxBrick);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
