import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Home from './pages/Home';
import { AuthorityProvider, useAuthority } from './authority';
import { authApiConfig, graphqlConfig } from './configs';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeRoute, ProjectsRoute } from './routes';
import Projects from './pages/Projects';
import { ApolloProvider } from '@apollo/client';
import useApollo from './apollo/useApollo';

export const App: React.FC = () => {
  const manager = useAuthority(authApiConfig);
  const apollo = useApollo(manager, graphqlConfig);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthorityProvider manager={manager}>
        <ApolloProvider client={apollo.apolloClient}>
          <BrowserRouter>
            <Switch>
              <Route path={HomeRoute} exact>
                <Home />
              </Route>
              <Route path={ProjectsRoute} exact>
                <Projects />
              </Route>
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </AuthorityProvider>
    </ChakraProvider>
  );
};
