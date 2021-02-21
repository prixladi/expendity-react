import React, { useCallback } from 'react';
import { Box, Container, Grid, Heading, Icon, Text as ChakraText } from '@chakra-ui/react';
import Text from '../Text';
import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';
import { FormikButton as Button } from '../Button';
import { FaUserAlt } from 'react-icons/fa';
import { CenterLink, GoogleButton, Page } from './Shared';
import { FormikHelpers } from 'formik';
import { useAuthorityManager } from '../../authority';
import { useHistory } from 'react-router-dom';
import { defaultCallbacks, onSignIn } from '../../services/authorityService';
import { StatusCodes } from 'http-status-codes';
import { registeredNotification } from '../../services/notificationService';
import Form from '../Form';
import { useApolloClient } from '@apollo/client';
import * as yup from 'yup';

type Values = {
  email: string;
  password: string;
};

const initialValues: Values = {
  email: '',
  password: '',
};

const schema = yup.object().shape({
  password: yup.string().min(6, `Password is too short. It must be a least 6 characters long.`),
});

type Props = {
  goto: (newPage: Page) => void;
};

const emailErrorMessage = 'Account with this email already exist';

const Register: React.FC<Props> = ({ goto }: Props) => {
  const manager = useAuthorityManager();
  const history = useHistory();
  const apollo = useApolloClient();

  const onSubmit = useCallback(
    async (submittedValues: Values, { setFieldError, setFieldValue }: FormikHelpers<Values>) => {
      const callbacks = defaultCallbacks(history);
      const result = await manager.register(submittedValues, callbacks);
      if (result.ok) {
        registeredNotification();
        const loginResult = await manager.passwordLogin(submittedValues, callbacks);
        if (loginResult.ok) {
          await onSignIn(history, apollo);
        } else {
          console.error(loginResult);
        }
      } else {
        if (result.status === StatusCodes.CONFLICT) {
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
    <Container>
      <Box mb="2em">
        <Heading as="h1" mb="0.5em">
          Register
        </Heading>
        <Text>Sign up to start using the application.</Text>
      </Box>

      <Form validationSchema={schema} initialValues={initialValues} onSubmit={onSubmit}>
        <Grid gridGap="1em">
          <EmailInput />
          <PasswordInput />
          <ChakraText textAlign="center" opacity="0.7">
            By signing up, you agree to our terms of service and privacy policy.
          </ChakraText>
          <Button submit minW="100%">
            Register
            <Icon ml="0.2em" as={FaUserAlt} />
          </Button>

          <ChakraText textAlign="center" opacity="0.6">
            or
          </ChakraText>

          <GoogleButton />
          <CenterLink onClick={() => goto('Login')}>Already have an account?</CenterLink>
        </Grid>
      </Form>
    </Container>
  );
};

export default Register;
