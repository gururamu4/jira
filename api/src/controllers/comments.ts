import { Comment } from 'entities';
import { catchErrors } from 'errors';
import { updateEntity, deleteEntity, createEntity } from 'utils/typeorm';

export const create = catchErrors(async (req, res) => {
  const comment = await createEntity(Comment, req.body);
  (res as any).respond({ comment });
});

export const update = catchErrors(async (req, res) => {
  const comment = await updateEntity(Comment, req.params.commentId, req.body);
  (res as any).respond({ comment });
});

export const remove = catchErrors(async (req, res) => {
  const comment = await deleteEntity(Comment, req.params.commentId);
  (res as any).respond({ comment });
});
