import { Callbacks, Manager } from '../authority';
import { HomeRoute, ProjectsRoute } from '../routes';
import {
  authServerErrorNotification,
  forbiddenNotification,
  loggedInNotification,
  loggedOutNotification,
  loginExpiredNotification,
} from './notificationService';
import { History } from 'history';
import { ApolloClient } from '@apollo/client';

type ReturnPathState = {
  returnPath?: string;
};

const defaultCallbacks = (history: History): Callbacks => ({
  onError: async (err) => {
    authServerErrorNotification();
    console.error(err);
  },
  onUnauthorized: async () => {
    loginExpiredNotification();
    history.push(HomeRoute);
  },
});

const onSignIn = async (history: History<ReturnPathState>, apollo: ApolloClient<unknown>): Promise<void> => {
  loggedInNotification();

  await apollo.cache.reset();

  if (history.location.state?.returnPath) {
    return history.push(history.location.state.returnPath);
  }

  history.push(ProjectsRoute);
};

const onUnauthorized = async (manager: Manager, history: History<ReturnPathState>, apollo: ApolloClient<unknown>): Promise<void> => {
  loginExpiredNotification();

  await apollo.cache.reset();
  await manager.logout();

  history.push(HomeRoute, { returnPath: history.location.pathname });
};

const onForbidden = async (apollo: ApolloClient<unknown>): Promise<void> => {
  forbiddenNotification();
  await apollo.cache.reset();
};

const signOut = async (manager: Manager, history: History, apollo: ApolloClient<unknown>): Promise<void> => {
  loggedOutNotification();

  await apollo.cache.reset();
  await manager.logout();

  history.push(HomeRoute);
};

export type { ReturnPathState };
export { defaultCallbacks, onUnauthorized, onForbidden, onSignIn, signOut };
