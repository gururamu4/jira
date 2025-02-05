import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import resetTestDatabase from 'database/resetDatabase';
import createTestAccount from 'database/createTestAccount';

export const resetDatabase = catchErrors(async (_req, res) => {
  await resetTestDatabase();
  (res as any).respond(true);
});

export const createAccount = catchErrors(async (_req, res) => {
  const user = await createTestAccount();
  (res as any).respond({
    authToken: signToken({ sub: user.id }),
  });
});
