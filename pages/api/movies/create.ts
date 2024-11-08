import { ManageMoviePayload } from '@/src/types';
import { createFormData } from '@/src/utils';
import { apiClient } from '@/src/utils/request';
import { IncomingForm } from 'formidable';
import * as fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing form data' });

      return;
    }

    const sessionData = fields as unknown as ManageMoviePayload;
    const buffer = fs.readFileSync(files.file?.[0].filepath as string);
    const blob = new Blob([buffer], { type: files.file?.[0].mimetype as string });

    const formData = createFormData({
      title: sessionData.title,
      year: sessionData.year,
      file: new File([blob], files.file?.[0].originalFilename as string, { type: files.file?.[0].mimetype as string })
    });

    const response = await apiClient.post('/movies', formData, {
      headers: {
        'Authorization': `Bearer ${req.cookies['session']}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    res.send(response.data);
  });
}
