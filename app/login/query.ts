import { gql } from '@apollo/client';

export const querySignin = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const queryDataUser = gql`
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
