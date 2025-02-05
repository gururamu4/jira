import { Project } from 'entities';
import { catchErrors } from 'errors';
import { findEntityOrThrow, updateEntity } from 'utils/typeorm';
import { issuePartial } from 'serializers/issues';

export const getProjectWithUsersAndIssues = catchErrors(async (req, res) => {
  const project = await findEntityOrThrow(Project, (req as any).currentUser.projectId, {
    relations: ['users', 'issues'],
  });
  (res as any).respond({
    project: {
      ...project,
      issues: project.issues.map(issuePartial),
    },
  });
});

export const update = catchErrors(async (req, res) => {
  const project = await updateEntity(Project, (req as any).currentUser.projectId, req.body);
  (res as any).respond({ project });
});
