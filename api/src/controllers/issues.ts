import { Issue } from 'entities';
import { catchErrors } from 'errors';
import { updateEntity, deleteEntity, createEntity, findEntityOrThrow } from 'utils/typeorm';

export const getProjectIssues = catchErrors(async (req, res) => {
  const { projectId } = (req as any).currentUser;
  const { searchTerm } = req.query;

  let whereSQL = 'issue.projectId = :projectId';

  if (searchTerm) {
    whereSQL += ' AND (issue.title ILIKE :searchTerm OR issue.descriptionText ILIKE :searchTerm)';
  }

  const issues = await Issue.createQueryBuilder('issue')
    .select()
    .where(whereSQL, { projectId, searchTerm: `%${searchTerm}%` })
    .getMany();

  (res as any).respond({ issues });
});

export const getIssueWithUsersAndComments = catchErrors(async (req, res) => {
  const issue = await findEntityOrThrow(Issue, req.params.issueId, {
    relations: ['users', 'comments', 'comments.user'],
  });
  (res as any).respond({ issue });
});

export const create = catchErrors(async (req, res) => {
  const listPosition = await calculateListPosition(req.body);
  const issue = await createEntity(Issue, { ...req.body, listPosition });
  (res as any).respond({ issue });
});

export const update = catchErrors(async (req, res) => {
  const issue = await updateEntity(Issue, req.params.issueId, req.body);
  (res as any).respond({ issue });
});

export const remove = catchErrors(async (req, res) => {
  const issue = await deleteEntity(Issue, req.params.issueId);
  (res as any).respond({ issue });
});

const calculateListPosition = async ({ projectId, status }: Issue): Promise<number> => {
  const issues = await Issue.find({ projectId, status });

  const listPositions = issues.map(({ listPosition }) => listPosition);

  if (listPositions.length > 0) {
    return Math.min(...listPositions) - 1;
  }
  return 1;
};
