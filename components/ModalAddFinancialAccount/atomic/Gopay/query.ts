import client from '$utils/graphql';
import { gql } from '@apollo/client';

export interface ISendOtpGopay {
  __typename: 'OTPData';
  username: string;
  uniqueId: string;
  sessionId: string;
  otpToken: string;
  redirectRefId: number;
  clientId: number;
}

export async function sendOtpGopay({
  nomorHp,
  token,
}: {
  nomorHp: string;
  token: string;
}): Promise<ISendOtpGopay> {
  const query = gql`
    query SendOtpGopayViaBrick($nomorHp: String!) {
      sendOtpGopayViaBrick(nomorHp: $nomorHp) {
        username
        uniqueId
        sessionId
        otpToken
        redirectRefId
        clientId
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { sendOtpGopayViaBrick },
        } = await client.query({
          query,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          variables: {
            nomorHp,
          },
        });

        resolve(sendOtpGopayViaBrick);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
