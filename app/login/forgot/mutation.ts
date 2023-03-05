import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IUserSignUp {
  __typename: 'AuthPayLoad';
  token: string;
}

export async function userSignUp({
  password,
  jwtToken,
}: {
  password: string;
  jwtToken: string;
}): Promise<IUserSignUp> {
  const mutation = gql`
    mutation ChangePassword($password: String!, $jwtToken: String!) {
      changePassword(password: $password, jwtToken: $jwtToken) {
        token
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { ChangePassword },
        } = await client.mutate({
          mutation,
          variables: { password, jwtToken },
        });
        resolve(ChangePassword);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
