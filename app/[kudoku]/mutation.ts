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
    $transactionName: String!
    $amount: String!
    $category: [CategoryInputType]!
    $transactionType: ExpenseTypeEnum!
    $direction: DirectionTypeEnum!
    $tags: [String!]!
    $currency: String!
    $notes: String
    $isHideFromBudget: Boolean!
    $isHideFromInsight: Boolean!
  ) {
    addCashTransaction(
      cashAccountId: $cashAccountId
      transactionName: $transactionName
      amount: $amount
      category: $category
      transactionType: $transactionType
      direction: $direction
      tags: $tags
      currency: $currency
      notes: $notes
      isHideFromBudget: $isHideFromBudget
      isHideFromInsight: $isHideFromInsight
    ) {
      id
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
      internalTransferAccountId
      direction
      notes
      location {
        latitude
        longitude
      }
      tags
      isHideFromBudget
      isHideFromInsight
      transactionName
    }
  }
`;

const mutationEditCashTransaction = gql`
  mutation EditCashTransaction(
    $transactionId: String!
    $transactionName: String!
    $category: [CategoryInputType]
    $transactionType: ExpenseTypeEnum
    $direction: DirectionTypeEnum
    $notes: String
    $location: LocationInputType
    $tags: [String!]
    $isHideFromBudget: Boolean
    $isHideFromInsight: Boolean
    $internalTransferAccountId: String
    $merchantId: String
    $amount: String
    $currency: String
  ) {
    editCashTransaction(
      transactionId: $transactionId
      transactionName: $transactionName
      category: $category
      transactionType: $transactionType
      direction: $direction
      notes: $notes
      location: $location
      tags: $tags
      isHideFromBudget: $isHideFromBudget
      isHideFromInsight: $isHideFromInsight
      internalTransferAccountId: $internalTransferAccountId
      merchantId: $merchantId
      amount: $amount
      currency: $currency
    ) {
      id
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
      internalTransferAccountId
      direction
      notes
      location {
        latitude
        longitude
      }
      tags
      isHideFromBudget
      isHideFromInsight
      transactionName
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

const mutationRefreshBCA = gql`
  mutation RefreshBcaTransactionViaBrick($debitAccountId: String!) {
    refreshBcaTransactionViaBrick(debitAccountId: $debitAccountId) {
      id
      debitAccountId
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
      internalTransferAccountId
      direction
      isSubscription
      notes
      location {
        latitude
        longitude
      }
      tags
      isHideFromBudget
      isHideFromInsight
      transactionMethod
    }
  }
`;

export {
  mutationAddCashAccount,
  mutationAddCashTransaction,
  mutationDeleteCashTransaction,
  mutationEditCashTransaction,
  mutationDeleteCashAccount,
  mutationReconcile,
  mutationConnectBCA,
  mutationDisconnectDebit,
  mutationRefreshBCA,
};
