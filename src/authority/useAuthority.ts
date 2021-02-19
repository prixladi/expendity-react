import { useMemo } from 'react';
import { Config } from './config';
import createManager, { Manager } from './manager';
import useTokenRefreshing from './useTokenRefreshing';

const useAuthority = (config: Config): Manager => {
  const manager = useMemo(() => createManager(() => config), [config]);
  useTokenRefreshing(manager);
  return manager;
};

export default useAuthority;
