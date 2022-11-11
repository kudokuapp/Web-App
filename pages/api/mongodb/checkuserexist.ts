import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

/*
 * @see https://beta.nextjs.org/docs/data-fetching/api-routes
 */

interface IDataPayload {
  exist: boolean;
  hasUsername: boolean;
  userId: ObjectId | undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = {} as IDataPayload;

  const uri = process.env.MONGODB_DATABASE_URL as string;
  const client = new MongoClient(uri);
  const { wa: param } = req.query;
  const wa = `+${param}`;

  const database = client.db('appdb');
  const userCollection = database.collection('User');

  try {
    const user = await userCollection.findOne({ whatsapp: wa });
    if (user) {
      data.exist = true;
      data.userId = user._id;
      if (user.username !== '') {
        data.hasUsername = true;
      }
      res.status(200).json(data);
    } else {
      res.status(500).json({ error: 'Cannot find user' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error, see console' });
  }
}
