import React, { useEffect, useState } from 'react';
import { Collapse } from '@chakra-ui/react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import { Page } from '../components/auth/Shared';
import ForgottenPassword from '../components/auth/ForgottenPassword';
import { NarrowContent } from '../components/Content';
import { useHistory } from 'react-router-dom';
import { useAuthorityManager } from '../authority';
import { ProjectsRoute } from '../routes';

const Home: React.FC = () => {
  const history = useHistory();
  const manager = useAuthorityManager();

  const [page, setPage] = useState('Login' as Page);
  const goto = (newPage: Page) => setPage(newPage);

  useEffect(() => {
    if (manager.isUserLoggedIn()) {
      history.push(ProjectsRoute);
    }
  }, [history, manager]);

  if (manager.isUserLoggedIn()) {
    return null;
  }

  return (
    <>
      <NarrowContent>
          <Collapse animateOpacity in={page === 'Login'}>
            <Login goto={goto} />
          </Collapse>
          <Collapse animateOpacity in={page === 'Register'}>
            <Register goto={goto} />
          </Collapse>
          <Collapse animateOpacity in={page === 'ForgottenPassword'}>
            <ForgottenPassword goto={goto} />
          </Collapse>
      </NarrowContent>
    </>
  );
};

export default Home;
