import { deleteById, update } from '@/server/repositories/bankAccount.repository';
import { CreateBankAccountZod } from '@/types/BankAccount.types';
import { getUserId } from '@/utils/userUtils';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { HttpStatusCode } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const bankAccountHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { id: idString } = query;
  if (!idString) {
    res.status(HttpStatusCode.BadRequest).end();
    return;
  }
  const id = parseInt(idString as string, 10);
  const userId = await getUserId(req, res);
  switch (method) {
    case 'PUT': {
      const bankAccount = CreateBankAccountZod.parse(req.body);
      const updated = await update(id, bankAccount);
      res.status(HttpStatusCode.Ok).json(updated);
      break;
    }
    case 'DELETE': {
      await deleteById(id, userId);
      res.status(HttpStatusCode.Ok).end();
      break;
    }
    default:
      res.setHeader('Allow', ['DELETE', 'PUT']);
      res.status(HttpStatusCode.MethodNotAllowed).end(`Method ${method} Not Allowed`);
  }
};

export default withApiAuthRequired(bankAccountHandler);
