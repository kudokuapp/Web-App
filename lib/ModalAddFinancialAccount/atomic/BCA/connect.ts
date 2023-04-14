import { addBcaAccount } from './mutation';
import { connectBca, getBcaTransaction } from './post';

interface IConnectBca {
  __typename: 'DebitAccount';
  id: string;
}

export async function connectBcaAll({
  token,
  brickInstitutionId,
  username,
  password,
}: {
  token: string;
  brickInstitutionId: number;
  username: string;
  password: string;
}): Promise<IConnectBca> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const account = await connectBca({
          token,
          brickInstitutionId,
          username,
          password,
        });

        if (!account.accessToken) throw new Error('access token null');

        const transaction = await getBcaTransaction({
          token,
          accessToken: account.accessToken,
        });

        const res = await addBcaAccount({ token, account, transaction });

        resolve(res);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })();
  });
}
