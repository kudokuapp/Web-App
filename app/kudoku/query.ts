import { gql } from '@apollo/client';

export const queryGetUser = gql`
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
