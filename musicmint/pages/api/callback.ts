import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';
import { getAccessToken } from '../../src/context/spotify';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  try {
    const data = await getAccessToken(code as string);
    const { accessToken } = data;

    res.redirect(`/artist?access_token=${accessToken}`);
  } catch (error) {
    res.redirect('/?error=access_denied');
  }
};
