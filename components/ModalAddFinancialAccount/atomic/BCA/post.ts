import { kudokuxbrickUrl } from '$utils/kudokuxbrick';
import axios from 'axios';
import moment from 'moment';

export async function connectBca({
  token,
  brickInstitutionId,
  username,
  password,
}: {
  token: string;
  brickInstitutionId: number;
  username: string;
  password: string;
}): Promise<BrickAccountDetail> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const url = kudokuxbrickUrl('/bca/account');

        const options = {
          method: 'POST',
          url: url.href,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: {
            type: 'kudoku-app',
            brickInstitutionId,
            username,
            password,
          },
        };

        const { data } = await axios.request(options);
        resolve(data as BrickAccountDetail);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })();
  });
}

export async function getBcaTransaction({
  token,
  accessToken,
}: {
  token: string;
  accessToken: string;
}): Promise<BrickTransactionData[]> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const url = kudokuxbrickUrl('/bca/transaction');

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
        resolve(data as BrickTransactionData[]);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })();
  });
}
