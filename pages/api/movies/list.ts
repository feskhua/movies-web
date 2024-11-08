import { apiClient } from '@/src/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;

  try {
    const response = await apiClient.get('/movies', {
      params: query,
      headers: {
        'Authorization': `Bearer ${req.cookies['session']}`
      }
    });

    res.send(response.data);
  } catch (error: any) {
    res.status(error.response.status).send(error.response.data);
  }
}
