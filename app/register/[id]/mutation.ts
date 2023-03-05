import client from '$utils/graphql';
import { gql } from '@apollo/client';
import { ObjectId } from 'mongodb';

interface IUserSignUp {
  __typename: 'AuthPayLoad';
  token: string;
}

export async function userSignUp({
  signupId,
  username,
  password,
  pin,
  jwtToken,
}: {
  signupId: ObjectId;
  username: string;
  password: string;
  pin: string;
  jwtToken: string;
}): Promise<IUserSignUp> {
  const mutation = gql`
    mutation Signup(
      $signupId: ID!
      $username: String!
      $password: String!
      $pin: String!
      $jwtToken: String!
    ) {
      signup(
        id: $signupId
        username: $username
        password: $password
        pin: $pin
        jwtToken: $jwtToken
      ) {
        token
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { signup },
        } = await client.mutate({
          mutation,
          variables: { signupId, username, password, pin, jwtToken },
        });
        resolve(signup);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
