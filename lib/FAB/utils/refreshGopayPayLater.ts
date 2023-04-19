import moment from 'moment';
import { checkExpired, gopayRefreshPost } from '../api';
import {
  refreshGopayPayLaterViaKudokuxBrick,
  refreshGopayWalletViaKudokuxBrick,
  updateEWalletAccountExpiry,
  updatePayLaterAccountExpiry,
} from '../graphql/mutation';
import {
  getEWalletAccountViaAccessToken,
  getInfoPayLaterAccount,
  getLatestEWalletTransaction,
  getLatestPayLaterTransaction,
} from '../graphql/query';

export async function refreshGopayPayLater(
  token: string,
  payLaterAccountId: string
) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const latestTransactionPayLater = await getLatestPayLaterTransaction(
          token,
          payLaterAccountId
        );

        const {
          dateTimestamp: dateTimestampPayLater,
          referenceId: referenceIdPayLater,
        } = latestTransactionPayLater;

        const payLaterAccountInfo = await getInfoPayLaterAccount(
          token,
          payLaterAccountId
        );

        const { brickAccessToken: accessToken } = payLaterAccountInfo;

        const eWalletAccountInfo = await getEWalletAccountViaAccessToken(
          token,
          accessToken
        );

        const { id: eWalletAccountId } = eWalletAccountInfo;

        const latestTransactionEWallet = await getLatestEWalletTransaction(
          token,
          eWalletAccountId
        );

        const {
          dateTimestamp: dateTimestampEWallet,
          referenceId: referenceIdEWallet,
        } = latestTransactionEWallet;

        const from =
          moment(dateTimestampEWallet) > moment(dateTimestampPayLater)
            ? moment(dateTimestampEWallet)
                .subtract(1, 'day')
                .format('YYYY-MM-DD')
            : moment(dateTimestampPayLater)
                .subtract(1, 'day')
                .format('YYYY-MM-DD');

        const expiredAccessToken = await checkExpired({ accessToken, token });

        if (!expiredAccessToken) {
          const kudokuxbrick = await gopayRefreshPost({
            accessToken,
            from,
            token,
          });
          const { eWallet, payLater } = kudokuxbrick;

          const latestAccountDetailEWallet = eWallet.account;
          const allTransactionsEWallet = eWallet.transaction;

          const latestAccountDetailPayLater = payLater.account;
          const allTransactionsPayLater = payLater.transaction;

          await refreshGopayWalletViaKudokuxBrick(
            token,
            eWalletAccountId,
            referenceIdEWallet,
            latestAccountDetailEWallet,
            allTransactionsEWallet
          );

          await refreshGopayPayLaterViaKudokuxBrick(
            token,
            payLaterAccountId,
            referenceIdPayLater,
            latestAccountDetailPayLater,
            allTransactionsPayLater
          );

          resolve('Sukses refresh gopay');
        } else {
          await updateEWalletAccountExpiry(token, eWalletAccountId);
          await updatePayLaterAccountExpiry(token, payLaterAccountId);
          reject();
        }
      } catch (error) {
        reject(error);
      }
    })();
  });
}
