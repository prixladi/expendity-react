import React, { useCallback, useMemo } from 'react';
import { NarrowContent } from '../components/Content';
import * as yup from 'yup';
import { Box, Grid, Icon } from '@chakra-ui/react';
import H1 from '../components/H1';
import Text from '../components/Text';
import Form from '../components/Form';
import { FaLockOpen } from 'react-icons/fa';
import { FormikHelpers } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuthorityManager } from '../authority';
import { defaultCallbacks } from '../services/authorityService';
import { passwordResetNotification } from '../services/notificationService';
import { HomeRoute } from '../routes';
import PasswordInput from '../components/PasswordInput';
import { Button } from '../components/Button';

type Values = {
  password: string;
};

const initialValues: Values = {
  password: '',
};

const schema = yup.object().shape({
  password: yup.string().min(6, `Password is too short. It must be a least 6 characters long.`),
});

const PasswordReset: React.FC = () => {
  const history = useHistory();
  const manager = useAuthorityManager();
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location]);

  const onSubmit = useCallback(
    async (values: Values, { setFieldError, setFieldValue }: FormikHelpers<Values>) => {
      const callbacks = defaultCallbacks(history);

      const result = await manager.resetPassword(
        queryParams.get('token') as string,
        queryParams.get('id') as string,
        values.password,
        callbacks,
      );

      if (result.ok) {
        passwordResetNotification();
        await manager.logout();
        history.push(HomeRoute);
      } else {
        setFieldError('password', 'Something went wrong, your link probably expired. Try requesting new password reset.');
        setFieldValue('password', '');
      }
    },
    [manager, history, queryParams],
  );

  return (
    <NarrowContent>
      <Box mb="2em">
        <H1>Password reset</H1>
        <Text>Create your new password.</Text>
      </Box>

      <Form validationSchema={schema} initialValues={initialValues} onSubmit={onSubmit}>
        <Grid gridGap="1em">
          <PasswordInput />
          <Button submit minW="100%">
            Reset password
            <Icon ml="0.2em" as={FaLockOpen} />
          </Button>
        </Grid>
      </Form>
    </NarrowContent>
  );
};

export default PasswordReset;
