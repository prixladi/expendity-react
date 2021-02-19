import { useEffect } from 'react';
import { Callbacks, Manager } from './manager';

const useTokenRefreshing = (manager: Manager): void => {
  useEffect(() => {
    const interval = setInterval(async () => {
      const profile = manager.getUserProfile();
      if (!profile || profile.tokenExpire > Math.floor(Date.now() / 1000) + 120 /* 2 minute skw */) {
        return;
      }

      const callbacks: Callbacks = {
        onError: (err: unknown) => {
          console.error(err);
          return Promise.resolve();
        },
        onUnauthorized: () => {
          console.error('Unable to refresh access token.');
          return Promise.resolve();
        },
      };

      if (await manager.refreshToken(callbacks)) {
        console.log('Successfuly refreshed access token.');
      } else {
        console.error('Unable to refresh access token.');
      }
    }, 30 * 1000 /* 30 seconds */);

    return () => clearInterval(interval);
  }, [manager]);
};

export default useTokenRefreshing;
