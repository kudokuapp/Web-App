import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function addCashTransaction({
  token,
  cashAccountId,
  transactionName,
  amount,
  merchantId,
  category,
  transactionType,
  notes,
}: {
  token: string;
  cashAccountId: string;
  transactionName: string;
  amount: string;
  merchantId: string;
  category: { name: string; amount: string }[];
  transactionType: 'INCOME' | 'EXPENSE';
  notes: string | null;
}): Promise<any> {
  const direction = transactionType === 'INCOME' ? 'IN' : 'OUT';
  const mutation = gql`
    mutation AddCashTransaction(
      $cashAccountId: String!
      $transactionName: String!
      $amount: String!
      $merchantId: String!
      $category: [NameAmountJsonInput]!
      $transactionType: ExpenseTypeEnum!
      $direction: DirectionTypeEnum!
      $notes: String
    ) {
      addCashTransaction(
        cashAccountId: $cashAccountId
        transactionName: $transactionName
        amount: $amount
        merchantId: $merchantId
        category: $category
        transactionType: $transactionType
        direction: $direction
        notes: $notes
      ) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { addCashTransaction },
        } = await client.mutate({
          mutation,
          variables: {
            cashAccountId,
            transactionName,
            amount,
            merchantId,
            category,
            transactionType,
            direction,
            notes,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(addCashTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function addEMoneyTransaction({
  token,
  eMoneyAccountId,
  transactionName,
  amount,
  merchantId,
  category,
  transactionType,
  institutionId,
  notes,
}: {
  token: string;
  eMoneyAccountId: string;
  transactionName: string;
  amount: string;
  merchantId: string;
  category: { name: string; amount: string }[];
  transactionType: 'INCOME' | 'EXPENSE';
  institutionId: string;
  notes: string | null;
}): Promise<any> {
  const mutation = gql`
    mutation AddEMoneyTransaction(
      $eMoneyAccountId: String!
      $transactionName: String!
      $amount: String!
      $merchantId: String!
      $category: [NameAmountJsonInput]!
      $transactionType: String!
      $direction: DirectionTypeEnum!
      $institutionId: String!
      $notes: String
    ) {
      addEMoneyTransaction(
        eMoneyAccountId: $eMoneyAccountId
        transactionName: $transactionName
        amount: $amount
        merchantId: $merchantId
        category: $category
        transactionType: $transactionType
        direction: $direction
        institutionId: $institutionId
        notes: $notes
      ) {
        id
      }
    }
  `;

  const direction = transactionType === 'INCOME' ? 'IN' : 'OUT';

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { addCashTransaction },
        } = await client.mutate({
          mutation,
          variables: {
            eMoneyAccountId,
            transactionName,
            amount,
            merchantId,
            category,
            transactionType,
            institutionId,
            notes,
            direction,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(addCashTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function refreshBca({
  token,
  debitAccountId,
}: {
  token: string;
  debitAccountId: string;
}) {
  const mutation = gql`
    mutation RefreshBcaTransactionViaBrick($debitAccountId: String!) {
      refreshBcaTransactionViaBrick(debitAccountId: $debitAccountId) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { refreshBcaTransactionViaBrick },
        } = await client.mutate({
          mutation,
          variables: {
            debitAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(refreshBcaTransactionViaBrick);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function refreshGopayWallet({
  token,
  eWalletAccountId,
}: {
  token: string;
  eWalletAccountId: string;
}) {
  const mutation = gql`
    mutation RefreshGopayTransactionViaBrick($eWalletAccountId: String) {
      refreshGopayTransactionViaBrick(eWalletAccountId: $eWalletAccountId) {
        response
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { refreshGopayTransactionViaBrick },
        } = await client.mutate({
          mutation,
          variables: {
            eWalletAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(refreshGopayTransactionViaBrick);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function refreshGopayPaylater({
  token,
  payLaterAccountId,
}: {
  token: string;
  payLaterAccountId: string;
}) {
  const mutation = gql`
    mutation RefreshGopayTransactionViaBrick($payLaterAccountId: String) {
      refreshGopayTransactionViaBrick(payLaterAccountId: $payLaterAccountId) {
        response
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { refreshGopayTransactionViaBrick },
        } = await client.mutate({
          mutation,
          variables: {
            payLaterAccountId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(refreshGopayTransactionViaBrick);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
