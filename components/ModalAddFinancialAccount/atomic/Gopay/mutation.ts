import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IConnectGopay {
  __typename: 'EWalletAccount';
  id: string;
}

export async function connectGopay({
  username,
  redirectRefId,
  clientId,
  sessionId,
  uniqueId,
  otpToken,
  otp,
  token,
}: {
  username: string;
  redirectRefId: number;
  clientId: number;
  sessionId: string;
  uniqueId: string;
  otpToken: string;
  otp: string;
  token: string;
}): Promise<IConnectGopay> {
  const mutation = gql`
    mutation ConnectGopayViaBrick(
      $username: String!
      $redirectRefId: Int!
      $clientId: Int!
      $sessionId: String!
      $uniqueId: String!
      $otpToken: String!
      $otp: String!
    ) {
      connectGopayViaBrick(
        username: $username
        redirectRefId: $redirectRefId
        clientId: $clientId
        sessionId: $sessionId
        uniqueId: $uniqueId
        otpToken: $otpToken
        otp: $otp
      ) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { connectGopayViaBrick },
        } = await client.mutate({
          mutation,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          variables: {
            username,
            redirectRefId,
            clientId,
            sessionId,
            uniqueId,
            otpToken,
            otp,
          },
        });
        resolve(connectGopayViaBrick);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
