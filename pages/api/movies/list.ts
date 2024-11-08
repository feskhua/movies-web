import { apiClient } from '@/src/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await apiClient.get('/movies', {
    headers: {
      'Authorization': `Bearer ${req.cookies['session']}`
    }
  });

  res.send(response.data);
}
