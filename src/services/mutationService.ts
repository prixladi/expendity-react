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

const projectOnCreateUpdate: MutationUpdaterFn<CreateProjectMutation> = (cache, { data }) => {
  if (data) {
    const oldProjects = cache.readQuery<ProjectsQuery>({ query: ProjectsDocument });
    if (oldProjects) {
      const newProjects: ProjectsQuery = {
        ...oldProjects,
        projects: {
          ...oldProjects.projects,
          count: oldProjects.projects.count + 1,
          entries: [data.createProject],
        },
      };

      cache.writeQuery<ProjectsQuery>({ query: ProjectsDocument, data: newProjects });
    }
  }
};

const projectOnDeleteUpdate: MutationUpdaterFn<DeleteProjectMutation> = (cache, { data }) => {
  if (data) {
    const oldProjects = cache.readQuery<ProjectsQuery>({ query: ProjectsDocument });
    if (oldProjects) {
      const newProjects: ProjectsQuery = {
        ...oldProjects,
        projects: {
          ...oldProjects.projects,
          count: oldProjects.projects.count - 1,
          entries: oldProjects.projects.entries.filter((x) => x.id !== data?.deleteProject.id),
        },
      };

      cache.evict({ fieldName: 'projects' });
      cache.writeQuery<ProjectsQuery>({ query: ProjectsDocument, data: newProjects });
    }

    cache.evict({
      fieldName: 'project',
      args: { id: data.deleteProject.id },
    });
  }
};

const projectOnUpdateUpdate: MutationUpdaterFn<UpdateProjectMutation> = (cache, { data }) => {
  if (data) {
    const oldProjects = cache.readQuery<ProjectsQuery>({ query: ProjectsDocument });
    if (oldProjects) {
      const newProjects: ProjectsQuery = {
        ...oldProjects,
        projects: {
          ...oldProjects.projects,
          count: oldProjects.projects.count - 1,
          entries: oldProjects.projects.entries.map((x) => (x.id === data?.updateProject.id ? data.updateProject : x)),
        },
      };

      cache.evict({ fieldName: 'projects' });
      cache.writeQuery<ProjectsQuery>({ query: ProjectsDocument, data: newProjects });
    }

    const oldProject = cache.readQuery<ProjectQuery>({ query: ProjectDocument, variables: { id: data.updateProject.id } });
    if (oldProject) {
      const newProject: ProjectQuery = {
        ...oldProject,
        project: {
          ...oldProject.project,
          ...data.updateProject,
          __typename: oldProject.project.__typename,
        },
      };

      cache.writeQuery<ProjectQuery>({ query: ProjectDocument, variables: { id: data.updateProject.id }, data: newProject });
    }
  }
};

export { projectOnCreateUpdate, projectOnDeleteUpdate, projectOnUpdateUpdate };
