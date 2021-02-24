import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { NormalizedCacheObject } from '@apollo/client/cache/inmemory/types';
import { HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import typePolicies from './typePolicies';
import { GraphqQLConfig } from '../configs/graphqlConfig';

type Apollo = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

const createHttpLink = (getBearerToken: () => string | null, url: string) => {
  if (!url) {
    throw new Error('Graphql endpoint url was not specified in config.');
  }

  const errorLink = onError((data) => {
    if (data.networkError) {
      console.error(`[Network error]: ${data.networkError}`);
      data.networkError = undefined;
    }
  });

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

  const httpLink = new HttpLink({
    uri: url,
  });

  return ApolloLink.from([authLink, errorLink, httpLink]);
};

const createApolloClient = (getBearerToken: () => string | null, graphqlConfig: GraphqQLConfig): Apollo => {
  const httpLink = createHttpLink(getBearerToken, graphqlConfig.url);

  const apolloClient = new ApolloClient({
    uri: graphqlConfig.url,
    link: httpLink,
    cache: new InMemoryCache({ typePolicies }),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });

  return {
    apolloClient,
  };
};

export type { Apollo };
export default createApolloClient;
