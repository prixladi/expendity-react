import { MutationUpdaterFn } from '@apollo/client';
import { CreateProjectMutation, ProjectsDocument, ProjectsQuery } from '../graphql';

const projectOnCreateUpdate: MutationUpdaterFn<CreateProjectMutation> = (cache, result) => {
  if (result.data) {
    const oldProjects = cache.readQuery<ProjectsQuery>({ query: ProjectsDocument });
    if (oldProjects) {
      const newProjects: ProjectsQuery = {
        ...oldProjects,
        projects: {
          ...oldProjects.projects,
          count: oldProjects.projects.count + 1,
          entries: [result.data.createProject],
        },
      };

      cache.writeQuery<ProjectsQuery>({ query: ProjectsDocument, data: newProjects });
    }
  }
};

export { projectOnCreateUpdate };
