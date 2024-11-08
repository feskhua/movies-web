import { AuthLoginRequestValue } from '@/src/types/store';
import { apiClient } from '@/src/utils/request';
import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sessionData = req.body as AuthLoginRequestValue;
    const response = await apiClient.post('/auth/register', sessionData);

    const cookie = serialize('session', response?.data?.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: sessionData.rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24,
      path: '/',
    });

    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({ message: 'Successfully set cookie!' });
  } catch (e: any) {
    res.status(e.response.status).json(e.response.data);
  }
}
