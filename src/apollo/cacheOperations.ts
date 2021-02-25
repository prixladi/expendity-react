import { MutationUpdaterFn } from '@apollo/client';
import {
  CreateExpenseMutation,
  CreateExpenseTypeMutation,
  CreateProjectInviteMutation,
  CreateProjectMutation,
  DeleteExpenseMutation,
  DeleteExpenseTypeMutation,
  DeleteProjectInviteMutation,
  DeleteProjectMutation,
  DeleteProjectPermissionMutation,
  ExpensesDocument,
  ExpensesQuery,
  ExpenseType,
  ProjectDocument,
  ProjectInvitesDocument,
  ProjectInvitesQuery,
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
      cache.gc();
      cache.writeQuery<ProjectsQuery>({ query: ProjectsDocument, data: newProjects });
    }

    cache.evict({
      fieldName: 'project',
      args: { id: data.deleteProject.id },
    });
    cache.gc();
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
      cache.gc();
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

const expenseTypeOnCreateUpdate: MutationUpdaterFn<CreateExpenseTypeMutation> = (cache, { data }) => {
  if (data) {
    const oldProject = cache.readQuery<ProjectQuery>({
      query: ProjectDocument,
      variables: { id: data.createExpenseType.projectId.toString() },
    });
    if (oldProject) {
      const newProject: ProjectQuery = {
        ...oldProject,
        project: {
          ...oldProject.project,
          expenseTypes: [...oldProject.project.expenseTypes, data.createExpenseType],
        },
      };

      cache.writeQuery<ProjectQuery>({ query: ProjectDocument, variables: { id: data.createExpenseType.projectId }, data: newProject });
    }
  }
};

const expenseTypeOnDeleteUpdate: MutationUpdaterFn<DeleteExpenseTypeMutation> = (cache, { data }) => {
  if (data) {
    const oldProject = cache.readQuery<ProjectQuery>({
      query: ProjectDocument,
      variables: { id: data.deleteExpenseType.projectId.toString() },
    });

    if (oldProject) {
      const newProject: ProjectQuery = {
        ...oldProject,
        project: {
          ...oldProject.project,
          expenseTypes: oldProject.project.expenseTypes.filter((x) => x.id !== data.deleteExpenseType.id),
        },
      };

      cache.writeQuery<ProjectQuery>({ query: ProjectDocument, variables: { id: data.deleteExpenseType.projectId }, data: newProject });
    }

    const oldExpenses = cache.readQuery<ExpensesQuery>({
      query: ExpensesDocument,
      variables: { filter: { projectId: data.deleteExpenseType.projectId } },
    });

    if (oldExpenses) {
      const newExpenses: ExpensesQuery = {
        ...oldExpenses,
        expenses: {
          ...oldExpenses.expenses,
          entries: oldExpenses.expenses.entries.map(
            (e): ExpenseType => {
              if (e.typeId !== Number(data.deleteExpenseType.id)) {
                return e;
              }

              return {
                ...e,
                typeId: null,
              };
            },
          ),
        },
      };

      cache.evict({ fieldName: 'expenses', args: { filter: { projectId: data.deleteExpenseType.projectId } } });
      cache.gc();
      cache.writeQuery<ExpensesQuery>({
        query: ExpensesDocument,
        variables: { filter: { projectId: data.deleteExpenseType.projectId } },
        data: newExpenses,
      });
    }
  }
};

const projectPermissionOnDeleteUpdate: MutationUpdaterFn<DeleteProjectPermissionMutation> = (cache, { data }) => {
  if (data) {
    const oldProject = cache.readQuery<ProjectQuery>({
      query: ProjectDocument,
      variables: { id: data.deleteProjectPermission.projectId.toString() },
    });
    if (oldProject) {
      const newProject: ProjectQuery = {
        ...oldProject,
        project: {
          ...oldProject.project,
          permissions: oldProject.project.permissions.filter((x) => x.id !== data.deleteProjectPermission.id),
        },
      };

      cache.writeQuery<ProjectQuery>({
        query: ProjectDocument,
        variables: { id: data.deleteProjectPermission.projectId },
        data: newProject,
      });
    }
  }
};

const projectInviteOnCreateUpdate: MutationUpdaterFn<CreateProjectInviteMutation> = (cache, { data }) => {
  if (data) {
    const oldInvites = cache.readQuery<ProjectInvitesQuery>({
      query: ProjectInvitesDocument,
      variables: { filter: { projectId: data.createProjectInvite.projectId } },
    });

    if (oldInvites) {
      const newProjects: ProjectInvitesQuery = {
        ...oldInvites,
        projectInvites: {
          ...oldInvites.projectInvites,
          entries: [...oldInvites.projectInvites.entries, data.createProjectInvite],
        },
      };

      cache.writeQuery<ProjectInvitesQuery>({
        query: ProjectInvitesDocument,
        variables: { filter: { projectId: data.createProjectInvite.projectId } },
        data: newProjects,
      });
    }
  }
};

const projectInviteOnDeleteUpdate: MutationUpdaterFn<DeleteProjectInviteMutation> = (cache, { data }) => {
  if (data) {
    const oldInvites = cache.readQuery<ProjectInvitesQuery>({
      query: ProjectInvitesDocument,
      variables: { filter: { projectId: data.deleteProjectInvite.projectId } },
    });

    if (oldInvites) {
      const newProjects: ProjectInvitesQuery = {
        ...oldInvites,
        projectInvites: {
          ...oldInvites.projectInvites,
          entries: oldInvites.projectInvites.entries.filter((x) => x.id !== data.deleteProjectInvite.id),
        },
      };

      cache.writeQuery<ProjectInvitesQuery>({
        query: ProjectInvitesDocument,
        variables: { filter: { projectId: data.deleteProjectInvite.projectId } },
        data: newProjects,
      });
    }
  }
};

const expenseOnCreateUpdate: MutationUpdaterFn<CreateExpenseMutation> = (cache, { data }) => {
  if (data) {
    const oldExpenses = cache.readQuery<ExpensesQuery>({
      query: ExpensesDocument,
      variables: { filter: { projectId: data.createExpense.projectId } },
    });

    if (oldExpenses) {
      const newExpenses: ExpensesQuery = {
        ...oldExpenses,
        expenses: {
          ...oldExpenses.expenses,
          count: oldExpenses.expenses.count + 1,
          entries: [data.createExpense],
        },
      };

      cache.writeQuery<ExpensesQuery>({
        query: ExpensesDocument,
        variables: { filter: { projectId: data.createExpense.projectId } },
        data: newExpenses,
      });
    }
  }
};

const expenseOnDeleteUpdate: MutationUpdaterFn<DeleteExpenseMutation> = (cache, { data }) => {
  if (data) {
    const oldExpenses = cache.readQuery<ExpensesQuery>({
      query: ExpensesDocument,
      variables: { filter: { projectId: data.deleteExpense.projectId } },
    });

    if (oldExpenses) {
      const newExpenses: ExpensesQuery = {
        ...oldExpenses,
        expenses: {
          ...oldExpenses.expenses,
          count: oldExpenses.expenses.count - 1,
          entries: oldExpenses.expenses.entries.filter((x) => x.id !== data?.deleteExpense.id),
        },
      };

      cache.evict({ fieldName: 'expenses', args: { filter: { projectId: data.deleteExpense.projectId } } });
      cache.gc();
      cache.writeQuery<ExpensesQuery>({
        query: ExpensesDocument,
        variables: { filter: { projectId: data.deleteExpense.projectId } },
        data: newExpenses,
      });
    }
  }
};

export { projectOnCreateUpdate, projectOnDeleteUpdate, projectOnUpdateUpdate };
export { expenseTypeOnCreateUpdate, expenseTypeOnDeleteUpdate };
export { projectPermissionOnDeleteUpdate };
export { projectInviteOnCreateUpdate, projectInviteOnDeleteUpdate };
export { expenseOnCreateUpdate, expenseOnDeleteUpdate };
