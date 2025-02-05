import { catchErrors } from 'errors';

export const getCurrentUser = catchErrors((req, res) => {
  (res as any).respond({ currentUser: (req as any).currentUser });
});
