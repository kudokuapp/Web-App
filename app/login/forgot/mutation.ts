import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IChangePassword {
  __typename: 'AuthPayLoad';
  token: string;
}

export async function changePassword({
  password,
  jwtToken,
}: {
  password: string;
  jwtToken: string;
}): Promise<IChangePassword> {
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
          data: { changePassword },
        } = await client.mutate({
          mutation,
          variables: { password, jwtToken },
        });
        resolve(changePassword);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
