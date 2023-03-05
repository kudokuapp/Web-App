import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface ISignIn {
  __typename: 'AuthPayLoad';
  token: string;
}

export async function signIn({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<ISignIn> {
  const query = gql`
    query Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { login },
        } = await client.query({
          query,
          variables: {
            username,
            password,
          },
        });

        resolve(login);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

interface IGetUser {
  __typename: 'User';
  id: string;
}

export async function getUser(username: string): Promise<IGetUser> {
  const query = gql`
    query GetUser($username: String!) {
      getUser(username: $username) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getUser },
        } = await client.query({
          query,
          variables: {
            username,
          },
        });

        resolve(getUser);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
