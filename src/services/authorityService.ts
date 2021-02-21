import { Callbacks, Manager } from '../authority';
import { HomeRoute, ProjectsRoute } from '../routes';
import { authServerErrorNotification, loggedInNotification, loggedOutNotification, loginExpiredNotification } from './notificationService';
import { History } from 'history';
import { ApolloClient } from '@apollo/client';


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

const onSignIn = async (history: History, apollo: ApolloClient<unknown>): Promise<void> => {
  loggedInNotification();

  await apollo.cache.reset();
  
  history.push(ProjectsRoute);
};

const onLoginExpired = async (manager: Manager, history: History, apollo: ApolloClient<unknown>): Promise<void> => {
  loginExpiredNotification();

  await apollo.cache.reset();
  await manager.logout();

  history.push(HomeRoute);
};

const signOut = async (manager: Manager, history: History, apollo: ApolloClient<unknown>): Promise<void> => {
  loggedOutNotification();

  await apollo.cache.reset();
  await manager.logout();

  history.push(HomeRoute);
};

export { defaultCallbacks, onLoginExpired, onSignIn, signOut };
