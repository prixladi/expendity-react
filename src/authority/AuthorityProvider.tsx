import React from 'react';
import { Manager } from './manager';

type Props = {
  manager: Manager;
  children: React.ReactNode;
};

const AuthorityContext = React.createContext<Manager | undefined>(undefined);

const AuthorityProvider: React.FC<Props> = ({ manager, children }: Props) => {
  return <AuthorityContext.Provider value={manager}>{children}</AuthorityContext.Provider>;
};

export { AuthorityContext };
export default AuthorityProvider;
