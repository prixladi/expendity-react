import { MutationUpdaterFn } from '@apollo/client';
import {
  CreateProjectMutation,
  DeleteProjectMutation,
  ProjectDocument,
  ProjectQuery,
  ProjectsDocument,
  ProjectsQuery,
  UpdateProjectMutation,
} from '../graphql';

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

const projectOnDeleteUpdate: MutationUpdaterFn<DeleteProjectMutation> = (cache, result) => {
  if (result.data) {
    const oldProjects = cache.readQuery<ProjectsQuery>({ query: ProjectsDocument });
    if (oldProjects) {
      const newProjects: ProjectsQuery = {
        ...oldProjects,
        projects: {
          ...oldProjects.projects,
          count: oldProjects.projects.count - 1,
          entries: oldProjects.projects.entries.filter((x) => x.id !== result.data?.deleteProject.id),
        },
      };

      cache.evict({ fieldName: 'projects' });
      cache.writeQuery<ProjectsQuery>({ query: ProjectsDocument, data: newProjects });
    }

    cache.evict({
      fieldName: 'project',
      args: { id: result.data.deleteProject.id },
    });
  }
};

const projectOnUpdateUpdate: MutationUpdaterFn<UpdateProjectMutation> = (cache, result) => {
  if (result.data) {
    const oldProjects = cache.readQuery<ProjectsQuery>({ query: ProjectsDocument });
    if (oldProjects) {
      const newProjects: ProjectsQuery = {
        ...oldProjects,
        projects: {
          ...oldProjects.projects,
          count: oldProjects.projects.count - 1,
          entries: oldProjects.projects.entries.map((x) => (x.id === result.data?.updateProject.id ? result.data.updateProject : x)),
        },
      };

      cache.evict({ fieldName: 'projects' });
      cache.writeQuery<ProjectsQuery>({ query: ProjectsDocument, data: newProjects });
    }

    const oldProject = cache.readQuery<ProjectQuery>({ query: ProjectDocument });
    if (oldProject) {
      const newProject: ProjectQuery = {
        ...oldProject,
        project: {
          ...oldProject.project,
          ...result.data.updateProject,
          __typename: oldProject.project.__typename,
        },
      };
      
      cache.writeQuery<ProjectQuery>({ query: ProjectDocument, data: newProject });
    }
  }
};

export { projectOnCreateUpdate, projectOnDeleteUpdate, projectOnUpdateUpdate };
