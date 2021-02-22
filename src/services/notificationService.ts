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

const registeredNotification = (): void => {
  send({ description: 'Successfuly registered.', status: 'success' });
};

const loggedInNotification = (): void => {
  send({ description: 'Successfuly signed in.', status: 'success' });
};

const forgottenPasswordSentNotification = (): void => {
  send({ description: 'Forgotten password reset has been sent to your email.', status: 'success' });
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

const loggedOutNotification = (): void => {
  send({ description: 'Successfuly signed out.', status: 'info' });
};

const loginExpiredNotification = (): void => {
  send({ description: 'You session expired please sign in again.', status: 'info' });
};

const loginNeededNotification = (): void => {
  send({ description: 'You need to sign in first.', status: 'info' });
};

export { authServerErrorNotification, apiServerErrorNotification, notFoundNotification };
export { projectCreatedNotification, projectUpdatedNotification, projectDeletedNotification };
export { expenseTypeCreatedNotification, expenseTypeUpdatedNotification, expenseTypeDeletedNotification };

export {
  loggedInNotification,
  loggedOutNotification,
  loginExpiredNotification,
  loginNeededNotification,
  registeredNotification,
  forgottenPasswordSentNotification,
};
