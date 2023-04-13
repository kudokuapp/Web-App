import { kudokuxbrickUrl } from '$utils/kudokuxbrick';
import axios from 'axios';
import moment from 'moment';

export interface ISendOtpGopay {
  username: string;
  uniqueId: string;
  sessionId: string;
  otpToken: string;
  redirectRefId: number;
  clientId: number;
}

export async function sendOtpGopay({
  token,
  phoneNumber,
}: {
  token: string;
  phoneNumber: string;
}): Promise<ISendOtpGopay> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const url = kudokuxbrickUrl('/gopay/sendotp');

        const options = {
          method: 'POST',
          url: url.href,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: { type: 'kudoku-app', phoneNumber },
        };

        const { data } = await axios.request(options);
        resolve(data as ISendOtpGopay);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })();
  });
}

export interface IGopayAccount {
  eWallet: BrickAccountDetail;
  payLater: BrickAccountDetail;
}

export async function gopayAccount({
  sendOtpData,
  otp,
  token,
}: {
  sendOtpData: ISendOtpGopay;
  otp: string;
  token: string;
}): Promise<IGopayAccount> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const url = kudokuxbrickUrl('/gopay/account');

        const options = {
          method: 'POST',
          url: url.href,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: {
            type: 'kudoku-app',
            ...sendOtpData,
            otp,
          },
        };

        const { data } = await axios.request(options);

        resolve(data as IGopayAccount);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })();
  });
}

export interface IGopayTransaction {
  eWallet: BrickTransactionData[];
  payLater: BrickTransactionData[];
}

export async function gopayTransaction({
  accessToken,
  token,
}: {
  accessToken: string;
  token: string;
}): Promise<IGopayTransaction> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const url = kudokuxbrickUrl('/gopay/transaction');

        const from = moment().subtract(2, 'weeks').format('YYYY-MM-DD');

        const options = {
          method: 'POST',
          url: url.href,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: {
            type: 'kudoku-app',
            from,
            accessToken,
          },
        };

        const { data } = await axios.request(options);

        resolve(data as IGopayTransaction);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })();
  });
}
