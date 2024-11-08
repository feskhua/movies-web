import { ManageMoviePayload } from '@/src/types';
import { apiClient } from '@/src/utils/request';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  console.log('req', req.method);

  if (req.method === 'PATCH') {
    const sessionData = req.body as ManageMoviePayload;
    const formData = new FormData();

    formData.append('title', sessionData.title);
    formData.append('year', sessionData.year.toString());

    if (sessionData.file) {
      formData.append('file', sessionData.file);
    }

    const response = await apiClient.post(`/movies/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${req.cookies['session']}`
      }
    });

    res.send(response.data);
  } else if (req.method === 'GET') {
    const response = await apiClient.get(`/movies/${id}`, {
      headers: {
        'Authorization': `Bearer ${req.cookies['session']}`
      }
    });

    res.send(response.data);
  } else if (req.method === 'DELETE') {
    const response = await apiClient.delete(`/movies/${id}`, {
      headers: {
        'Authorization': `Bearer ${req.cookies['session']}`
      }
    });

    res.send(response.data);
  }
}
