import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';

const send = (options: UseToastOptions) => {
  const toast = createStandaloneToast();
  toast({
    duration: 8 * 1000,
    isClosable: true,
    ...options,
  });
};

const authServerErrorNotification = (): void => {
  send({ description: 'Authorization server returned error response.', status: 'error' });
};

const apiServerErrorNotification = (): void => {
  send({ description: 'Aplication server returned error response.', status: 'error' });
};

const notFoundNotification = (): void => {
  send({ description: 'Requested resource was not found.', status: 'error' });
};

const forbiddenNotification = (): void => {
  send({ description: "You don't have permissions for this operation. If problem persists try refreshing page.", status: 'warning' });
};

const invalidInviteNotification = (): void => {
  send({ description: 'Project invite is invalid. It is probably expired.', status: 'warning' });
};

const inviteAcceptedNotification = (): void => {
  send({ description: 'Invite accepted, redirecting to your new project.', status: 'success' });
};

const registeredNotification = (): void => {
  send({ description: 'Successfuly registered.', status: 'success' });
};

const loggedInNotification = (): void => {
  send({ description: 'Successfuly signed in.', status: 'success' });
};

const passwordResetNotification = (): void => {
  send({ description: 'Password successfuly reset. Log in with new password.', status: 'success' });
};

const forgottenPasswordSentNotification = (): void => {
  send({ description: 'Forgotten password reset has been sent to your email.', status: 'success' });
};

const expenseCreatedNotification = (): void => {
  send({ description: 'New Expense has been successfuly created.', status: 'success' });
};

const expenseUpdatedNotification = (): void => {
  send({ description: 'Expense has been successfuly created.', status: 'success' });
};

const expenseDeletedNotification = (): void => {
  send({ description: 'Expense has been successfuly deleted.', status: 'success' });
};

const expenseTypeCreatedNotification = (): void => {
  send({ description: 'New Expense Type has been successfuly created.', status: 'success' });
};

const expenseTypeUpdatedNotification = (): void => {
  send({ description: 'Expense Type has been successfuly created.', status: 'success' });
};

const expenseTypeDeletedNotification = (): void => {
  send({ description: 'Expense Type has been successfuly deleted.', status: 'success' });
};

const projectCreatedNotification = (): void => {
  send({ description: 'New Project has been successfuly created.', status: 'success' });
};

const projectUpdatedNotification = (): void => {
  send({ description: 'Project has been successfuly updated.', status: 'success' });
};

const projectDeletedNotification = (): void => {
  send({ description: 'Project has been successfuly deleted.', status: 'success' });
};

const permissionUpdatedNotification = (): void => {
  send({ description: 'Permission has been succesfuly updated.', status: 'success' });
};

const inviteCreatedNotification = (): void => {
  send({ description: 'New Project Invite has been successfuly created.', status: 'success' });
};

const inviteDeletedNotification = (): void => {
  send({ description: 'Project Invite has been successfuly deleted.', status: 'success' });
};

const urlSuccessfulyCoppiedNotification = (): void => {
  send({ description: 'Url has been coppied.', status: 'info' });
};

const loggedOutNotification = (): void => {
  send({ description: 'Successfuly signed out.', status: 'info' });
};

const loginExpiredNotification = (): void => {
  send({ description: 'You session has expired please sign in again.', status: 'info' });
};

const loginNeededNotification = (): void => {
  send({ description: 'You need to sign in first.', status: 'info' });
};

export { authServerErrorNotification, apiServerErrorNotification, notFoundNotification, forbiddenNotification };
export { projectCreatedNotification, projectUpdatedNotification, projectDeletedNotification };
export { expenseTypeCreatedNotification, expenseTypeUpdatedNotification, expenseTypeDeletedNotification };
export { expenseCreatedNotification, expenseUpdatedNotification, expenseDeletedNotification };
export { permissionUpdatedNotification };
export { inviteCreatedNotification, inviteDeletedNotification };

export {
  inviteAcceptedNotification,
  loggedInNotification,
  loggedOutNotification,
  loginExpiredNotification,
  loginNeededNotification,
  registeredNotification,
  forgottenPasswordSentNotification,
  urlSuccessfulyCoppiedNotification,
  passwordResetNotification,
  invalidInviteNotification,
};
