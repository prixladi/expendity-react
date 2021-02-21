import React, { useCallback } from 'react';
import { Box, Container, Grid, Heading, Icon } from '@chakra-ui/react';
import Text from '../Text';
import EmailInput from '../EmailInput';
import { FormikButton as Button } from '../Button';
import { FaLockOpen } from 'react-icons/fa';
import { CenterLink, Page } from './Shared';
import { useAuthorityManager } from '../../authority';
import { forgottenPasswordSentNotification } from '../../services/notificationService';
import { defaultCallbacks } from '../../services/authorityService';
import { useHistory } from 'react-router-dom';
import Form from '../Form';
import { FormikHelpers } from 'formik';

type Values = {
  email: string;
};

const initialValues: Values = {
  email: '',
};

type Props = {
  goto: (newPage: Page) => void;
};

const ForgottenPassword: React.FC<Props> = ({ goto }: Props) => {
  const manager = useAuthorityManager();
  const history = useHistory();

  const onSubmit = useCallback(
    async (submittedValues: Values, { setFieldValue }: FormikHelpers<Values>) => {
      const result = await manager.sendForgottenPassword(submittedValues.email, defaultCallbacks(history));
      if (result.ok) {
        forgottenPasswordSentNotification();
        setFieldValue('email', '');
        goto('Login');
      }
    },
    [manager, history, goto],
  );

  return (
    <Container>
      <Box mb="2em">
        <Heading as="h1" mb="0.5em">
          Forgotten password
        </Heading>
        <Text>Enter your email to send reset action to.</Text>
      </Box>

      <Form initialValues={initialValues} onSubmit={onSubmit}>
        <Grid gridGap="1em">
          <EmailInput />
          <Button submit minW="100%">
            Send forgotten password
            <Icon ml="0.2em" as={FaLockOpen} />
          </Button>
          <CenterLink onClick={() => goto('Login')}>Remembered?</CenterLink>
        </Grid>
      </Form>
    </Container>
  );
};

export default ForgottenPassword;
