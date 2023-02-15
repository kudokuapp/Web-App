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

export {
  mutationAddCashAccount,
  mutationAddCashTransaction,
  mutationDeleteCashTransaction,
  mutationDeleteCashAccount,
};
