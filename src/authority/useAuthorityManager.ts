import { useContext } from 'react';
import { Manager } from '.';
import { AuthorityContext } from './AuthorityProvider';

const useAuthorityManager = (): Manager => {
  const manager = useContext(AuthorityContext);

  if (!manager) {
    throw new Error('Unable to retrieve authority manager in current context.');
  }

  return manager;
};

export default useAuthorityManager;
