import { gql } from '@apollo/client';

export const queryGetUser = gql`
  query Getuserbyusername($username: String!) {
    getuserbyusername(username: $username) {
      id
      email
      whatsapp
    }
  }
`;

export const queryGetTokenFromOtp = gql`
  mutation GetTokenFromOtp($otp: String!, $email: String) {
    getTokenFromOtp(otp: $otp, email: $email) {
      token
    }
  }
`;

export const queryChangePassword = gql`
  mutation ChangePassword($password: String!) {
    changePassword(password: $password) {
      token
    }
  }
`;
