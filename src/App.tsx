import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Home from './pages/Home';
import { AuthorityProvider, useAuthority } from './authority';
import { authApiConfig, graphqlConfig } from './configs';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeRoute, LogoutRoute, ProjectsRoute, ProfileRoute, ProjectRoute } from './routes';
import Projects from './pages/Projects';
import { ApolloProvider } from '@apollo/client';
import useApollo from './apollo/useApollo';
import Overlay from './components/Overlay';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import Project from './pages/Project';

export const App: React.FC = () => {
  const manager = useAuthority(authApiConfig);
  const apollo = useApollo(manager, graphqlConfig);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthorityProvider manager={manager}>
        <ApolloProvider client={apollo.apolloClient}>
          <BrowserRouter>
            <Switch>
              <Overlay>
                <Route path={HomeRoute} exact>
                  <Home />
                </Route>
                <Route path={LogoutRoute} exact>
                  <Logout />
                </Route>
                <Route path={ProfileRoute} exact>
                  <Profile />
                </Route>
                <Route path={ProjectsRoute} exact>
                  <Projects />
                </Route>
                <Route path={ProjectRoute(':projectId')}>
                  <Project />
                </Route>
              </Overlay>
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </AuthorityProvider>
    </ChakraProvider>
  );
};
