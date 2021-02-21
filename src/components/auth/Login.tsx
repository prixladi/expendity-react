import React, { useCallback } from 'react';
import { Box, Grid, Heading, Icon, Text as ChakraText } from '@chakra-ui/react';
import Text from '../Text';
import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';
import { FormikButton as Button } from '../Button';
import Form from '../Form';
import { FaEnvelope } from 'react-icons/fa';
import { CenterLink, GoogleButton, Page } from './Shared';
import { FormikHelpers } from 'formik';
import { useAuthorityManager } from '../../authority';
import { useHistory } from 'react-router-dom';
import { defaultCallbacks, onSignIn } from '../../services/authorityService';
import { StatusCodes } from 'http-status-codes';
import { useApolloClient } from '@apollo/client';

type Values = {
  email: string;
  password: string;
};

const initialValues: Values = {
  email: '',
  password: '',
};

type Props = {
  goto: (newPage: Page) => void;
};

const emailErrorMessage = 'Invalid email or password';

const Login: React.FC<Props> = ({ goto }: Props) => {
  const manager = useAuthorityManager();
  const history = useHistory();
  const apollo = useApolloClient();

  const onSubmit = useCallback(
    async (submittedValues: Values, { setFieldError, setFieldValue }: FormikHelpers<Values>) => {
      const result = await manager.passwordLogin(submittedValues, defaultCallbacks(history));
      if (result.ok) {
        await onSignIn(history, apollo);
      } else {
        if (result.status === StatusCodes.BAD_REQUEST) {
          setFieldError('email', emailErrorMessage);
          setFieldValue('password', '');
        } else {
          console.error('Error while logging in.', result);
        }
      }
    },
    [manager, history, apollo],
  );

  return (
    <Box>
      <Box mb="2em">
        <Heading as="h1" mb="0.5em">
          Login
        </Heading>
        <Text>Sign in to start using the application.</Text>
      </Box>
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        <Grid gridGap="1em">
          <EmailInput />
          <PasswordInput />
          <CenterLink onClick={() => goto('ForgottenPassword')}>Don{"'"}t remember your password?</CenterLink>
          <Button submit minW="100%">
            Sign in with Email
            <Icon ml="0.2em" as={FaEnvelope} />
          </Button>
          <ChakraText textAlign="center" opacity="0.6">
            or
          </ChakraText>

          <GoogleButton />
          <CenterLink onClick={() => goto('Register')}>Create new account.</CenterLink>
        </Grid>
      </Form>
    </Box>
  );
};

export default Login;
