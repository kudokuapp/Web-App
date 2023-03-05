import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IGetAllUsername {
  __typename: 'User';
  username: string;
}

export async function getAllUsername(): Promise<IGetAllUsername[]> {
  const query = gql`
    query GetAllUser {
      getAllUser {
        username
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllUser },
        } = await client.query({ query });
        resolve(getAllUser);
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
          data: { GetOtp },
        } = await client.query({
          query,
          variables: {
            whatsapp,
          },
        });
        resolve(GetOtp);
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
          data: { GetOtp },
        } = await client.query({
          query,
          variables: {
            email,
          },
        });
        resolve(GetOtp);
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
          data: { VerifyOtp },
        } = await client.query({
          query,
          variables: {
            whatsapp,
            otp,
          },
        });
        resolve(VerifyOtp);
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
          data: { VerifyOtp },
        } = await client.query({
          query,
          variables: {
            email,
            otp,
          },
        });
        resolve(VerifyOtp);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
