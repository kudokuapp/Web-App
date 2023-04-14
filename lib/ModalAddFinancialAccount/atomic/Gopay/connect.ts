import { addEWallet, addPayLater } from './mutation';
import { gopayAccount, gopayTransaction, ISendOtpGopay } from './post';

interface IConnectGopayAll {
  eWallet: {
    __typename: 'EWalletAccount';
    id: string;
  };

  payLater: {
    __typename: 'PayLaterAccount';
    id: string;
  };
}

export async function connectGopayAll({
  sendOtpData,
  otp,
  token,
}: {
  sendOtpData: ISendOtpGopay;
  otp: string;
  token: string;
}): Promise<IConnectGopayAll> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const allAccount = await gopayAccount({ sendOtpData, otp, token });

        const eWalletAccount = allAccount.eWallet;
        const payLaterAccount = allAccount.payLater;

        if (!eWalletAccount.accessToken) throw new Error('access token null');

        const allTransaction = await gopayTransaction({
          accessToken: eWalletAccount.accessToken,
          token,
        });

        const eWalletTransaction = allTransaction.eWallet;
        const payLaterTransaction = allTransaction.payLater;

        const resEWallet = await addEWallet({
          token,
          account: eWalletAccount,
          transaction: eWalletTransaction,
        });
        const resPayLater = await addPayLater({
          token,
          account: payLaterAccount,
          transaction: payLaterTransaction,
        });

        resolve({ eWallet: resEWallet, payLater: resPayLater });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })();
  });
}
