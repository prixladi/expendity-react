import createManager, { Manager, Callbacks } from './manager';
import useAuthorityManager from './useAuthorityManager';
import useAuthority from './useAuthority';
import AuthorityProvider from './AuthorityProvider';

export * from './models';

export type { Manager, Callbacks };
export { AuthorityProvider, useAuthority, useAuthorityManager };
export default createManager;
