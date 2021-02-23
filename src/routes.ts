const HomeRoute = '/';
const ProjectsRoute = '/projects';
const ProfileRoute = '/profile';
const LogoutRoute = '/logout';
const PasswordResetRoute = '/passwordReset';

const ProjectRoute = (id: string): string => `/projects/${id}`;
const ExpenseTypesRoute = (projectId: string): string => `/projects/${projectId}/expenseTypes`;
const UserPermissionsRoute = (projectId: string): string => `/projects/${projectId}/userPermissions`;
const InvitesRoute = (projectId: string): string => `/projects/${projectId}/invites`;
const AcceptInviteRoute = (token: string): string => `/i/${token}`;

export { HomeRoute, ProjectsRoute, ProfileRoute, LogoutRoute, PasswordResetRoute };
export { ProjectRoute, ExpenseTypesRoute, UserPermissionsRoute, InvitesRoute, AcceptInviteRoute };
