import { kudokuxbrickUrl } from '$utils/kudokuxbrick';
import axios from 'axios';

interface Account {
  account: BrickAccountDetail;
  transaction: BrickTransactionData[];
}

interface Response {
  eWallet: Account;
  payLater: Account;
}

export function gopayRefreshPost({
  accessToken,
  from,
  token,
}: {
  accessToken: string;
  from: string;
  token: string;
}): Promise<Response> {
  return new Promise((resolve, reject) => {
    const url = kudokuxbrickUrl('/gopay/refresh');

    const options = {
      method: 'POST',
      url: url.href,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        type: 'kudoku-app',
        accessToken,
        from,
      },
    };

    (async () => {
      try {
        const { data }: { data: Response } = await axios.request(options);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
