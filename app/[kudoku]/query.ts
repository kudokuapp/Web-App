import { gql } from '@apollo/client';

const queryGetUser = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      id
      username
      firstName
      lastName
      email
      whatsapp
      kudosNo
      createdAt
    }
  }
`;

const queryAllCashAccount = gql`
  query GetAllCashAccount {
    getAllCashAccount {
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

const queryAllCashTransaction = gql`
  query GetAllCashTransaction($cashAccountId: String!) {
    getAllCashTransaction(cashAccountId: $cashAccountId) {
      id
      cashAccountId
      dateTimestamp
      currency
      amount
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
      merchant {
        id
        name
        picture
        url
      }
      transactionName
    }
  }
`;

const queryProfile = gql`
  query GetProfile($userId: String) {
    getProfile(userId: $userId) {
      id
      user {
        id
        username
        firstName
        lastName
        email
        whatsapp
        kudosNo
        createdAt
      }
      userId
      bio
      profilePicture
      birthday
    }
  }
`;

const queryAllDebitAccount = gql`
  query GetAllDebitAccount {
    getAllDebitAccount {
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

const queryAllDebitTransaction = gql`
  query GetAllDebitTransaction($debitAccountId: String!) {
    getAllDebitTransaction(debitAccountId: $debitAccountId) {
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
  queryGetUser,
  queryAllCashAccount,
  queryProfile,
  queryAllCashTransaction,
  queryAllDebitAccount,
  queryAllDebitTransaction,
};