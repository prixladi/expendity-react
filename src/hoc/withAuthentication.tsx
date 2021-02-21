import { useApolloClient } from '@apollo/client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthorityManager } from '../authority';
import { defaultCallbacks, onLoginExpired } from '../services/authorityService';

const withAuthentication = <TProps extends Record<string, string>>(Component: React.FC<TProps>, Skeleton: React.FC) => {
  return function WithAuthentication(props: TProps): JSX.Element {
    const [skeleton, setSkeleton] = useState(true);
    const history = useHistory();
    const manager = useAuthorityManager();
    const apollo = useApolloClient();
    const isMounted = useRef(false);

    const handleProfile = useCallback(async () => {
      const profile = manager.getUserProfile();
      if (profile && profile.tokenExpire > Math.floor(Date.now() / 1000) + 120 /*2 minute skw*/) {
        setSkeleton(false);
        return;
      }

      if (await manager.refreshToken(defaultCallbacks(history))) {
        if (isMounted.current) {
          setSkeleton(false);
        }
      } else {
        onLoginExpired(manager, history, apollo);
      }
    }, [history, manager, setSkeleton, apollo]);

    useEffect(() => {
      isMounted.current = true;
      handleProfile();
      return () => {
        isMounted.current = false;
      };
    }, [handleProfile]);

    if (skeleton) {
      return <Skeleton />;
    }

    return <Component {...props} />;
  };
};

export default withAuthentication;
