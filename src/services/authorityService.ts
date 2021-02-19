import { Callbacks, Manager } from '../authority';
import { HomeRoute } from '../routes';
import { authServerErrorNotification, loggedInNotification, loggedOutNotification, loginExpiredNotification } from './notificationService';
import { History } from 'history';


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

const onSignIn = async (history: History): Promise<void> => {
  loggedInNotification();
  history.push("/");
};

const onLoginExpired = async (manager: Manager, history: History): Promise<void> => {
  loginExpiredNotification();
  await manager.logout();
  history.push(HomeRoute);
};

const signOut = async (manager: Manager, history: History): Promise<void> => {
  await manager.logout();
  loggedOutNotification();
  history.push(HomeRoute);
};

export { defaultCallbacks, onLoginExpired, onSignIn, signOut };
