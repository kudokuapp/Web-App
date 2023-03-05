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
          data: { Login },
        } = await client.query({
          query,
          variables: {
            username,
            password,
          },
        });

        resolve(Login);
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
          data: { GetUser },
        } = await client.query({
          query,
          variables: {
            username,
          },
        });

        resolve(GetUser);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
