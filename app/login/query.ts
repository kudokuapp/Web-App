import { gql } from '@apollo/client';

export const querySignin = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
