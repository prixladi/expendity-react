import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Home from './pages/Home';
import { AuthorityProvider, useAuthority } from './authority';
import { authApiConfig, graphqlConfig } from './configs';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  HomeRoute,
  LogoutRoute,
  ProjectsRoute,
  ProfileRoute,
  ProjectRoute,
  ExpenseTypesRoute,
  UserPermissionsRoute,
  InvitesRoute,
  PasswordResetRoute,
  AcceptInviteRoute,
  ExpensesRoute,
  StatisticsRoute,
} from './routes';
import Projects from './pages/Projects';
import { ApolloProvider } from '@apollo/client';
import useApollo from './apollo/useApollo';
import Overlay from './components/Overlay';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import Project from './pages/Project';
import ExpenseTypes from './pages/Project/ExpenseTypes';
import UserPermissions from './pages/Project/UserPermissions';
import Invites from './pages/Project/Invites';
import PasswordReset from './pages/PasswordReset';
import AcceptInvite from './pages/AcceptInvite';
import Expenses from './pages/Project/Expenses';
import Statistics from './pages/Project/Statistics';

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

                <Route path={ProjectRoute(':projectId')} exact>
                  <Project />
                </Route>

                <Route path={ExpenseTypesRoute(':projectId')} exact>
                  <ExpenseTypes />
                </Route>

                <Route path={UserPermissionsRoute(':projectId')} exact>
                  <UserPermissions />
                </Route>

                <Route path={InvitesRoute(':projectId')} exact>
                  <Invites />
                </Route>

                <Route path={ExpensesRoute(':projectId')} exact>
                  <Expenses />
                </Route>

                <Route path={StatisticsRoute(':projectId')} exact>
                  <Statistics />
                </Route>

                <Route path={PasswordResetRoute} exact>
                  <PasswordReset />
                </Route>

                <Route path={AcceptInviteRoute(':token')} exact>
                  <AcceptInvite />
                </Route>
              </Overlay>
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </AuthorityProvider>
    </ChakraProvider>
  );
};
