import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function getAllCashTransaction(
  token: string,
  cashAccountId: string
): Promise<IGetAllCashTransaction[]> {
  const query = gql`
    query GetAllCashTransaction($cashAccountId: String!) {
      getAllCashTransaction(cashAccountId: $cashAccountId) {
        id
        transactionName
        cashAccountId
        dateTimestamp
        currency
        amount
        merchant {
          id
          name
          picture
          url
        }
        merchantId
        category {
          name
          amount
        }
        transactionType
        internalTransferTransactionId
        direction
        notes
        location {
          latitude
          longitude
        }
        tags {
          name
          amount
        }
        isHideFromBudget
        isHideFromInsight
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllCashTransaction },
        } = await client.query({
          query,
          variables: { cashAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllCashTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function getAllDebitTransaction(
  token: string,
  debitAccountId: string
): Promise<IGetAllDebitTransaction[]> {
  const query = gql`
    query GetAllDebitTransaction($debitAccountId: String!) {
      getAllDebitTransaction(debitAccountId: $debitAccountId) {
        amount
        category {
          amount
          name
        }
        id
        transactionName
        debitAccountId
        dateTimestamp
        referenceId
        institutionId
        currency
        onlineTransaction
        isReviewed
        merchantId
        transactionType
        description
        internalTransferTransactionId
        direction
        isSubscription
        notes
        isHideFromBudget
        isHideFromInsight
        transactionMethod
        merchant {
          id
          name
          picture
          url
        }
        location {
          latitude
          longitude
        }
        tags {
          name
          amount
        }
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllDebitTransaction },
        } = await client.query({
          query,
          variables: { debitAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllDebitTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function getAllEMoneyTransaction(
  token: string,
  eMoneyAccountId: string
): Promise<IGetAllEMoneyTransaction[]> {
  const query = gql`
    query GetAllEMoneyTransaction($eMoneyAccountId: String!) {
      getAllEMoneyTransaction(eMoneyAccountId: $eMoneyAccountId) {
        id
        transactionName
        eMoneyAccountId
        dateTimestamp
        institutionId
        currency
        amount
        isReviewed
        merchant {
          id
          name
          picture
          url
        }
        merchantId
        category {
          name
          amount
        }
        transactionType
        internalTransferTransactionId
        description
        direction
        notes
        location {
          latitude
          longitude
        }
        tags {
          name
          amount
        }
        isHideFromBudget
        isHideFromInsight
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllEMoneyTransaction },
        } = await client.query({
          query,
          variables: { eMoneyAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllEMoneyTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function getAllEWalletTransaction(
  token: string,
  eWalletAccountId: string
): Promise<IGetAllEWalletTransaction[]> {
  const query = gql`
    query GetAllEWalletTransaction($eWalletAccountId: String!) {
      getAllEWalletTransaction(eWalletAccountId: $eWalletAccountId) {
        id
        transactionName
        eWalletAccountId
        dateTimestamp
        referenceId
        institutionId
        currency
        amount
        onlineTransaction
        isReviewed
        merchant {
          id
          name
          picture
          url
        }
        merchantId
        category {
          name
          amount
        }
        transactionType
        description
        internalTransferTransactionId
        direction
        isSubscription
        notes
        location {
          latitude
          longitude
        }
        tags {
          name
          amount
        }
        isHideFromBudget
        isHideFromInsight
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllEWalletTransaction },
        } = await client.query({
          query,
          variables: { eWalletAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllEWalletTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function getAllPayLaterTransaction(
  token: string,
  payLaterAccountId: string
): Promise<IGetAllPayLaterTransaction[]> {
  const query = gql`
    query GetAllPayLaterTransaction($payLaterAccountId: String!) {
      getAllPayLaterTransaction(payLaterAccountId: $payLaterAccountId) {
        id
        transactionName
        payLaterAccountId
        dateTimestamp
        referenceId
        institutionId
        currency
        amount
        onlineTransaction
        isReviewed
        merchant {
          id
          name
          picture
          url
        }
        merchantId
        category {
          name
          amount
        }
        transactionType
        description
        internalTransferTransactionId
        direction
        isSubscription
        notes
        location {
          latitude
          longitude
        }
        tags {
          name
          amount
        }
        isHideFromBudget
        isHideFromInsight
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllPayLaterTransaction },
        } = await client.query({
          query,
          variables: { payLaterAccountId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(getAllPayLaterTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
