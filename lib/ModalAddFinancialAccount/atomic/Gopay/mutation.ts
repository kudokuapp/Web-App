import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IAddEWallet {
  __typename: 'EWalletAccount';
  id: string;
}

export async function addEWallet({
  token,
  account,
  transaction,
}: {
  token: string;
  account: BrickAccountDetail;
  transaction: BrickTransactionData[];
}): Promise<IAddEWallet> {
  const mutation = gql`
    mutation ConnectGopayWalletViaKudokuxBrick(
      $account: KudokuxBrickAccount!
      $transaction: [KudokuxBrickTransaction!]
    ) {
      connectGopayWalletViaKudokuxBrick(
        account: $account
        transaction: $transaction
      ) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { connectGopayWalletViaKudokuxBrick },
        } = await client.mutate({
          mutation,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          variables: { account, transaction },
        });
        resolve(connectGopayWalletViaKudokuxBrick);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })();
  });
}

interface IAddPayLater {
  __typename: 'PayLaterAccount';
  id: string;
}

export async function addPayLater({
  token,
  account,
  transaction,
}: {
  token: string;
  account: BrickAccountDetail;
  transaction: BrickTransactionData[];
}): Promise<IAddPayLater> {
  const mutation = gql`
    mutation ConnectGopayPayLaterViaKudokuxBrick(
      $account: KudokuxBrickAccount!
      $transaction: [KudokuxBrickTransaction!]
    ) {
      connectGopayPayLaterViaKudokuxBrick(
        account: $account
        transaction: $transaction
      ) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { connectGopayPayLaterViaKudokuxBrick },
        } = await client.mutate({
          mutation,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          variables: { account, transaction },
        });
        resolve(connectGopayPayLaterViaKudokuxBrick);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })();
  });
}
