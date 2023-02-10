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

export { queryGetUser, queryAllCashAccount, queryProfile };
