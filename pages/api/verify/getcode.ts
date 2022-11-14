import client from '$utils/twilio';
import { NextApiRequest, NextApiResponse } from 'next';

/*
 * @see https://beta.nextjs.org/docs/data-fetching/api-routes
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    res.status(500).json({ error: 'Only POST method allowed' });

  const { type, receiver } = req.body;

  try {
    const response = await client.verify
      .services(process.env.TWILIO_SERVICE_SID as string)
      .verifications.create({
        to: receiver,
        channel: type,
        locale: 'id',
      });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error, check console' });
  }
}
