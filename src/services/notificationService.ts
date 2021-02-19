import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';

const send = (options: UseToastOptions) => {
  const toast = createStandaloneToast();
  toast({
    duration: 10 * 1000,
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

const siteCreatedNotification = (): void => {
  send({ description: 'New site has been successfuly created.', status: 'success' });
};

const templateCreatedNotification = (): void => {
  send({ description: 'New template has been successfuly created.', status: 'success' });
};

const siteUpdatedNotification = (): void => {
  send({ description: 'Site has been successfuly updated.', status: 'success' });
};

const siteDeletedNotification = (): void => {
  send({ description: 'Site has been successfuly deleted.', status: 'success' });
};

const templateUpdatedNotification = (): void => {
  send({ description: 'Template has been successfuly updated.', status: 'success' });
};

const templateRemovedNotification = (): void => {
  send({ description: 'Template has been successfuly removed.', status: 'success' });
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

export {
  authServerErrorNotification,
  apiServerErrorNotification,
  notFoundNotification,
  loggedInNotification,
  siteCreatedNotification,
  templateCreatedNotification,
  siteUpdatedNotification,
  siteDeletedNotification,
  templateUpdatedNotification,
  templateRemovedNotification,
  loggedOutNotification,
  loginExpiredNotification,
  loginNeededNotification,
  registeredNotification,
  forgottenPasswordSentNotification,
};
