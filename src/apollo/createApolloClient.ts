import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NormalizedCacheObject } from '@apollo/client/cache/inmemory/types';
import { HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import typePolicies from './typePolicies';
import { GraphqQLConfig } from '../configs/graphqlConfig';

type Apollo = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

const createHttpLink = (getBearerToken: () => string | null, url: string) => {
  if (!url) {
    throw new Error('Graphql endpoint url was not specified in config.');
  }

  const authLink = setContext((_, { headers }) => {
    const token = getBearerToken();

    if (token) {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return { headers: {} };
  });

  const httpLink = authLink.concat(
    new HttpLink({
      uri: url,
    }),
  );

  return httpLink;
};

const createApolloClient = (getBearerToken: () => string | null, graphqlConfig: GraphqQLConfig): Apollo => {
  const httpLink = createHttpLink(getBearerToken, graphqlConfig.url);

  const apolloClient = new ApolloClient({
    uri: graphqlConfig.url,
    link: httpLink,
    cache: new InMemoryCache({ typePolicies }),
  });

  return {
    apolloClient,
  };
};

export type { Apollo };
export default createApolloClient;
