import pool from '$utils/postgresql';
import { NextApiRequest, NextApiResponse } from 'next';

/*
 * @see https://beta.nextjs.org/docs/data-fetching/api-routes
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { wa: param } = req.query;
  const wa = `+${param}`;
  try {
    const response = await dbQuery(wa);
    res.status(200).json({ ...response.json() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error, check console' });
  }
}

const dbQuery = async (wa: string): Promise<any> => {
  const queryString = `INSERT INTO users_wa (whatsapp, registerdate) VALUES ($1, $2)`;
  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const arr = [wa, date];
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
