import { useMemo } from 'react';
import { Manager } from '../authority';
import { GraphqQLConfig } from '../configs/graphqlConfig';
import createApolloClient, { Apollo } from './createApolloClient';

const useApollo = (authorityManager: Manager, graphqlConfig: GraphqQLConfig): Apollo => {
  const store = useMemo(
    () =>
      createApolloClient(() => {
        const tokens = authorityManager.getTokens();
        return tokens.bearerToken;
      }, graphqlConfig),
    [authorityManager, graphqlConfig],
  );

  return store;
};

export default useApollo;
