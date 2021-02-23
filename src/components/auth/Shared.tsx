import React, { useState } from 'react';
import { Icon, Link, Text } from '@chakra-ui/react';
import { FormikButton as Button } from '../Button';
import { FaGoogle } from 'react-icons/fa';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { googleConfig } from '../../configs';
import { defaultCallbacks, onSignIn, ReturnPathState } from '../../services/authorityService';
import { useHistory } from 'react-router-dom';
import { useAuthorityManager } from '../../authority';
import { useApolloClient } from '@apollo/client';

type Page = 'Login' | 'Register' | 'ForgottenPassword';

type CenterLinkProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const CenterLink: React.FC<CenterLinkProps> = ({ children, onClick }: CenterLinkProps) => (
  <Text textAlign="center" opacity="0.7">
    <Link onClick={onClick} color="red.500">
      {children}
    </Link>
  </Text>
);

const GoogleButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authManager = useAuthorityManager();
  const history = useHistory<ReturnPathState>();
  const apollo = useApolloClient();

  return (
    <GoogleLogin
      clientId={googleConfig.clientId}
      render={({ disabled, onClick }) => (
        <Button onClick={onClick} isDisabled={disabled} minW="100%" isLoading={isLoading}>
          Sign in with Google
          <Icon ml="0.2em" as={FaGoogle} />
        </Button>
      )}
      onRequest={() => {
        setIsLoading(true);
      }}
      onSuccess={async (response) => {
        const result = await authManager.googleLogin({ idToken: (response as GoogleLoginResponse).tokenId }, defaultCallbacks(history));
        if (result.ok) {
          await onSignIn(history, apollo);
        } else {
          console.error('Error while logging in.', result);
        }
        setIsLoading(false);
      }}
      onFailure={(err) => {
        console.error(err);
        setIsLoading(false);
      }}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export type { Page };
export { GoogleButton, CenterLink };
