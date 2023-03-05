import axios from 'axios';
import { CheckUserExistDataPayload } from 'pages/api/mongodb/checkuserexist';

export async function checkIfUsernameExist(
  email: string
): Promise<CheckUserExistDataPayload> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.get('/api/mongodb/checkuserexist', {
          params: {
            email,
          },
        });

        if (Object.keys(data).length === 0) reject();

        if (data.hasUsername) {
          resolve(data as CheckUserExistDataPayload);
        } else {
          reject();
        }
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function checkIfAlreadyInvited(
  email: string
): Promise<CheckUserExistDataPayload> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.get('/api/mongodb/checkuserexist', {
          params: {
            email,
          },
        });

        if (Object.keys(data).length === 0) reject();

        if (data.exist) {
          resolve(data as CheckUserExistDataPayload);
        } else {
          reject();
        }
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function checkKudos(
  email: string
): Promise<PostgresDataKudokuUser> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.get('/api/postgres/checkkudos', {
          params: {
            email,
          },
        });
        if (Object.keys(data).length === 0) reject();
        resolve(data as PostgresDataKudokuUser);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
