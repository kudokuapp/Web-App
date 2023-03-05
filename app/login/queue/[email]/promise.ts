import axios from 'axios';

export async function getCodeEmail(email: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        // setTimeout(() => resolve('sukses'), 2000);
        const { data } = await axios.post('/api/verify/getcode', {
          receiver: email,
          type: 'email',
        });
        resolve(data);
      } catch (e) {
        reject();
      }
    })();
  });
}

export async function cekOtpEmail({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        // setTimeout(() => resolve('sukses'), 2000);
        const { data } = await axios.post('/api/verify/confirmcode', {
          receiver: email,
          code: otp,
        });
        resolve(data);
      } catch (e) {
        reject();
      }
    })();
  });
}
