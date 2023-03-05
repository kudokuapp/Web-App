import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetUser {
  __typename: 'User';
  email: string;
  whatsapp: string;
}

export async function getUser(username: string): Promise<IGetUser> {
  const query = gql`
    query GetUser($username: String!) {
      getUser(username: $username) {
        email
        whatsapp
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

interface IGetOtp {
  __typename: 'ResponseMessage';
  response: string;
}

export async function getWaOtp(whatsapp: string): Promise<IGetOtp> {
  const query = gql`
    query GetOtp($whatsapp: String) {
      getOtp(whatsapp: $whatsapp) {
        response
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getOtp },
        } = await client.query({
          query,
          variables: {
            whatsapp,
          },
        });
        resolve(getOtp);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function getEmailOtp(email: string): Promise<IGetOtp> {
  const query = gql`
    query GetOtp($email: String) {
      getOtp(email: $email) {
        response
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getOtp },
        } = await client.query({
          query,
          variables: {
            email,
          },
        });
        resolve(getOtp);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

interface IVerifyOtp {
  __typename: 'AuthPayLoad';
  token: string;
}

export async function confirmWaOtp({
  whatsapp,
  otp,
}: {
  whatsapp: string;
  otp: string;
}): Promise<IVerifyOtp> {
  const query = gql`
    query VerifyOtp($otp: String!, $whatsapp: String) {
      verifyOtp(otp: $otp, whatsapp: $whatsapp) {
        token
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { verifyOtp },
        } = await client.query({
          query,
          variables: {
            whatsapp,
            otp,
          },
        });
        resolve(verifyOtp);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function confirmEmailOtp({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): Promise<IVerifyOtp> {
  const query = gql`
    query VerifyOtp($otp: String!, $email: String) {
      verifyOtp(otp: $otp, email: $email) {
        token
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { verifyOtp },
        } = await client.query({
          query,
          variables: {
            email,
            otp,
          },
        });
        resolve(verifyOtp);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
