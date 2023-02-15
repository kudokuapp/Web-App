import { gql } from '@apollo/client';

const mutationAddCashAccount = gql`
  mutation AddCashAccount(
    $accountName: String!
    $startingBalance: String!
    $currency: String!
  ) {
    addCashAccount(
      accountName: $accountName
      startingBalance: $startingBalance
      currency: $currency
    ) {
      id
      userId
      createdAt
      lastUpdate
      accountName
      displayPicture
      balance
      currency
    }
  }
`;

const mutationAddCashTransaction = gql`
  mutation AddCashTransaction(
    $cashAccountId: String!
    $amount: String!
    $category: [CategoryInputType]!
    $transactionType: ExpenseTypeEnum!
    $direction: DirectionTypeEnum!
    $currency: String!
    $isHideFromBudget: Boolean!
    $isHideFromInsight: Boolean!
    $merchantId: String
    $tags: [String!]!
  ) {
    addCashTransaction(
      cashAccountId: $cashAccountId
      amount: $amount
      category: $category
      transactionType: $transactionType
      direction: $direction
      currency: $currency
      isHideFromBudget: $isHideFromBudget
      isHideFromInsight: $isHideFromInsight
      merchantId: $merchantId
      tags: $tags
    ) {
      amount
      cashAccountId
      currency
      dateTimestamp
      direction
      id
      isHideFromBudget
      isHideFromInsight
      transactionType
      merchantId
      location {
        latitude
        longitude
      }
    }
  }
`;

const mutationDeleteCashTransaction = gql`
  mutation DeleteCashTransaction($transactionId: String!) {
    deleteCashTransaction(transactionId: $transactionId) {
      response
    }
  }
`;

const mutationDeleteCashAccount = gql`
  mutation DeleteCashAccount($cashAccountId: String!) {
    deleteCashAccount(cashAccountId: $cashAccountId) {
      response
    }
  }
`;

const mutationReconcile = gql`
  mutation ReconcileCashBalance($newBalance: String!, $cashAccountId: String!) {
    reconcileCashBalance(
      newBalance: $newBalance
      cashAccountId: $cashAccountId
    ) {
      id
      userId
      createdAt
      lastUpdate
      accountName
      displayPicture
      balance
      currency
    }
  }
`;

const mutationConnectBCA = gql`
  mutation ConnectBcaViaBrick(
    $brickInstitutionId: Int!
    $username: String!
    $password: String!
  ) {
    connectBcaViaBrick(
      brickInstitutionId: $brickInstitutionId
      username: $username
      password: $password
    ) {
      id
      userId
      institutionId
      accountNumber
      createdAt
      lastUpdate
      balance
      currency
    }
  }
`;

const mutationDisconnectDebit = gql`
  mutation DeleteDebitAccount($debitAccountId: String!) {
    deleteDebitAccount(debitAccountId: $debitAccountId) {
      response
    }
  }
`;

export {
  mutationAddCashAccount,
  mutationAddCashTransaction,
  mutationDeleteCashTransaction,
  mutationDeleteCashAccount,
  mutationReconcile,
  mutationConnectBCA,
  mutationDisconnectDebit,
};
