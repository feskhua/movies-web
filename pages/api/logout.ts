import {NextApiRequest, NextApiResponse} from "next";
import {cookies} from "next/headers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', 'session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict');
  
  res.status(200).json({ message: 'Successfully Logout' })
}
