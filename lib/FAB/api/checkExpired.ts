import { kudokuxbrickUrl } from '$utils/kudokuxbrick';
import axios from 'axios';

export function checkExpired({
  accessToken,
  token,
}: {
  accessToken: string;
  token: string;
}): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const url = kudokuxbrickUrl('/utils/checkifexpired');

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
      },
    };

    (async () => {
      try {
        const { data }: { data: { expired: boolean } } = await axios.request(
          options
        );

        if (data.expired) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (e) {
        reject(e);
      }
    })();
  });
}
