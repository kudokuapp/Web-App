import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

/*
 * @see https://beta.nextjs.org/docs/data-fetching/api-routes
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uri = process.env.MONGODB_DATABASE_URL as string;
  const client = new MongoClient(uri);
  const { id: idParam } = req.query;
  const id = new ObjectId(idParam as string);

  const database = client.db('appdb');
  const userCollection = database.collection('User');

  try {
    const user = await userCollection.findOne({ _id: id });

    if (!user) {
      res.status(500).json({ message: 'Cannot find user' });
    }

    res.status(200).json({ ...user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error, see console' });
  }
}
