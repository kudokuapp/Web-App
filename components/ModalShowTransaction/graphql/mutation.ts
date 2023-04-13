import client from '$utils/graphql';
import { gql } from '@apollo/client';

export async function editCashTransaction({
  token,
  transactionId,
  transactionName,
  merchantId,
  category,
  notes,
}: {
  token: string;
  transactionId: string;
  transactionName: string;
  merchantId: string;
  category: { name: string; amount: string }[];
  notes: string | null;
}): Promise<any> {
  const mutation = gql`
    mutation EditCashTransaction(
      $transactionId: String!
      $transactionName: String
      $merchantId: String
      $category: [NameAmountJsonInput]
      $notes: String
    ) {
      editCashTransaction(
        transactionId: $transactionId
        transactionName: $transactionName
        merchantId: $merchantId
        category: $category
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
          data: { editCashTransaction },
        } = await client.mutate({
          mutation,
          variables: {
            transactionId,
            transactionName,
            merchantId,
            category,
            notes,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(editCashTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function editDebitTransaction({
  token,
  transactionId,
  transactionName,
  merchantId,
  category,
  notes,
}: {
  token: string;
  transactionId: string;
  transactionName: string;
  merchantId: string;
  category: { name: string; amount: string }[];
  notes: string | null;
}): Promise<any> {
  const mutation = gql`
    mutation EditDebitTransaction(
      $transactionId: String!
      $transactionName: String
      $merchantId: String
      $category: [NameAmountJsonInput]
      $notes: String
    ) {
      editDebitTransaction(
        transactionId: $transactionId
        transactionName: $transactionName
        merchantId: $merchantId
        category: $category
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
          data: { editDebitTransaction },
        } = await client.mutate({
          mutation,
          variables: {
            transactionId,
            transactionName,
            merchantId,
            category,
            notes,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(editDebitTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function editEMoneyTransaction({
  token,
  transactionId,
  transactionName,
  merchantId,
  category,
  notes,
}: {
  token: string;
  transactionId: string;
  transactionName: string;
  merchantId: string;
  category: { name: string; amount: string }[];
  notes: string | null;
}): Promise<any> {
  const mutation = gql`
    mutation EditEMoneyTransaction(
      $transactionId: String!
      $transactionName: String
      $merchantId: String
      $category: [NameAmountJsonInput]
      $notes: String
    ) {
      editEMoneyTransaction(
        transactionId: $transactionId
        transactionName: $transactionName
        merchantId: $merchantId
        category: $category
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
          data: { editEMoneyTransaction },
        } = await client.mutate({
          mutation,
          variables: {
            transactionId,
            transactionName,
            merchantId,
            category,
            notes,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(editEMoneyTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function editEWalletTransaction({
  token,
  transactionId,
  transactionName,
  merchantId,
  category,
  notes,
}: {
  token: string;
  transactionId: string;
  transactionName: string;
  merchantId: string;
  category: { name: string; amount: string }[];
  notes: string | null;
}): Promise<any> {
  const mutation = gql`
    mutation EditEWalletTransaction(
      $transactionId: String!
      $transactionName: String
      $merchantId: String
      $category: [NameAmountJsonInput]
      $notes: String
    ) {
      editEWalletTransaction(
        transactionId: $transactionId
        transactionName: $transactionName
        merchantId: $merchantId
        category: $category
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
          data: { editEWalletTransaction },
        } = await client.mutate({
          mutation,
          variables: {
            transactionId,
            transactionName,
            merchantId,
            category,
            notes,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(editEWalletTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function editPayLaterTransaction({
  token,
  transactionId,
  transactionName,
  merchantId,
  category,
  notes,
}: {
  token: string;
  transactionId: string;
  transactionName: string;
  merchantId: string;
  category: { name: string; amount: string }[];
  notes: string | null;
}): Promise<any> {
  const mutation = gql`
    mutation EditPayLaterTransaction(
      $transactionId: String!
      $transactionName: String
      $merchantId: String
      $category: [NameAmountJsonInput]
      $notes: String
    ) {
      editPayLaterTransaction(
        transactionId: $transactionId
        transactionName: $transactionName
        merchantId: $merchantId
        category: $category
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
          data: { editPayLaterTransaction },
        } = await client.mutate({
          mutation,
          variables: {
            transactionId,
            transactionName,
            merchantId,
            category,
            notes,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        resolve(editPayLaterTransaction);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
