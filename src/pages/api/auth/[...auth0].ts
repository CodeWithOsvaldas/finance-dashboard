import { handleAuth, handleCallback, Session } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { createIfNotExists } from '@/server/repositories/user.repository';

const afterCallback = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
  const { user } = session;
  if (user) {
    await createIfNotExists(user);
  }
  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
