import React, { useState } from 'react';
import { Box, Collapse, Flex, useBreakpointValue } from '@chakra-ui/react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import { Page } from '../components/auth/Shared';
import ForgottenPassword from '../components/auth/ForgottenPassword';
import { NarrowContent } from '../components/Content';
import TextLogo from '../components/TextLogo';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';

const Home: React.FC = () => {
  const [page, setPage] = useState('Login' as Page);
  const goto = (newPage: Page) => setPage(newPage);
  const margin = useBreakpointValue(['1rem', '2.5rem', '5rem', '10rem']);

  return (
    <>
      <Flex ml={margin} mr={margin} mt="0.5em" fontSize="2em" justifyContent="space-between">
        <TextLogo /> <ColorModeSwitcher />{' '}
      </Flex>

      <NarrowContent>
        <Box pt={['0.5em', '2em', '3em', '3.5em']}>
          <Collapse animateOpacity in={page === 'Login'}>
            <Login goto={goto} />
          </Collapse>
          <Collapse animateOpacity in={page === 'Register'}>
            <Register goto={goto} />
          </Collapse>
          <Collapse animateOpacity in={page === 'ForgottenPassword'}>
            <ForgottenPassword goto={goto} />
          </Collapse>
        </Box>
      </NarrowContent>
    </>
  );
};

export default Home;
