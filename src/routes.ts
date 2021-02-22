const HomeRoute = '/';
const ProjectsRoute = '/projects';
const ProfileRoute = '/profile';
const LogoutRoute = '/logout';

const ProjectRoute = (id: string): string => `/projects/${id}`;
const ExpenseTypesRoute = (projectId: string): string => `/projects/${projectId}/expenseTypes`;

export { HomeRoute, ProjectsRoute, ProfileRoute, LogoutRoute };
export { ProjectRoute, ExpenseTypesRoute };
