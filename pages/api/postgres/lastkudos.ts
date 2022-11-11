import pool from '$utils/postgresql';
import { NextApiRequest, NextApiResponse } from 'next';

/*
 * @see https://beta.nextjs.org/docs/data-fetching/api-routes
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = await dbQuery();
    res.status(200).json(id);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error, check console' });
  }
}

const dbQuery = async (): Promise<any> => {
  const queryString = `SELECT * FROM users_final ORDER BY id DESC`;
  const arr: any[] = [];
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
