import pool from '$utils/postgresql';
import { NextApiRequest, NextApiResponse } from 'next';

/*
 * @see https://beta.nextjs.org/docs/data-fetching/api-routes
 */

interface IDataPayload {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  whatsapp: string;
  registerdate: Date;
  invited: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { wa: param } = req.query;
  const wa = `+${param}`;

  try {
    const response = await dbQuery(wa);
    res.status(200).json({ ...response } as IDataPayload);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error, see console' });
  }
}

const dbQuery = async (wa: string): Promise<any> => {
  const queryString = `SELECT * FROM users_final WHERE whatsapp=$1`;
  const arr = [wa];
  return new Promise((resolve, reject) => {
    pool.query(queryString, arr, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows[0]);
      }
    });
  });
};
