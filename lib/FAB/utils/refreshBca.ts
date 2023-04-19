import moment from 'moment';
import { bcaRefreshPost, checkExpired } from '../api';
import {
  refreshBcaViaKudokuxBrick,
  updateDebitAccountExpiry,
} from '../graphql/mutation';
import {
  getInfoDebitAccount,
  getLatestDebitTransaction,
} from '../graphql/query';

export async function refreshBca(token: string, debitAccountId: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const latestTransaction = await getLatestDebitTransaction(
          token,
          debitAccountId
        );
        const { dateTimestamp, referenceId } = latestTransaction;

        const debitAccountInfo = await getInfoDebitAccount(
          token,
          debitAccountId
        );

        const { brickAccessToken: accessToken } = debitAccountInfo;

        const from = moment(dateTimestamp)
          .subtract(1, 'day')
          .format('YYYY-MM-DD');

        const expiredAccessToken = await checkExpired({ accessToken, token });

        if (!expiredAccessToken) {
          const kudokuxbrick = await bcaRefreshPost({
            accessToken,
            from,
            token,
          });
          const latestAccountDetail = kudokuxbrick.account[0];
          const allTransactions = kudokuxbrick.transaction;

          const response = await refreshBcaViaKudokuxBrick(
            token,
            debitAccountId,
            referenceId,
            latestAccountDetail,
            allTransactions
          );

          resolve(response);
        } else {
          await updateDebitAccountExpiry(token, debitAccountId);
          reject();
        }
      } catch (error) {
        reject(error);
      }
    })();
  });
}
