import { catchErrors } from '../errors';
import { signToken } from '../utils/authToken';
import createAccount from '../database/createGuestAccount';
import { Response } from 'express';

export const createGuestAccount = catchErrors(async (_req, res: Response) => {
  const user = await createAccount();
  (res as any).respond({
    authToken: signToken({ sub: user.id }),
  });
});
