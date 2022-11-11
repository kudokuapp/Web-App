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

  const { code, receiver } = req.body;

  try {
    const response = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID as string)
      .verificationChecks.create({ to: receiver, code: code });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error, see console' });
  }
}
