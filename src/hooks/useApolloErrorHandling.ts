import { ApolloError, useApolloClient } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { useEffect } from 'react';
import { onForbidden } from '../services/authorityService';
import { apiServerErrorNotification } from '../services/notificationService';

type Return = {
  handleApolloError: (error?: ApolloError) => void;
  handleGqlError: (error?: readonly GraphQLError[]) => void;
};

const useApolloErrorHandling = (error?: ApolloError): Return => {
  const apollo = useApolloClient();

  const handleApolloError = (error?: ApolloError) => {
    if (error) {
      console.error(error);
      apiServerErrorNotification();
    }
  };

  const handleGqlError = (error?: readonly GraphQLError[]) => {
    if (error) {
      console.error(error);
      if (error.some((e) => e.extensions && e.extensions['codes'] && e.extensions['codes'].includes('FORBIDDEN'))) {
        onForbidden(apollo);
      } else {
        apiServerErrorNotification();
      }
    }
  };

  useEffect(() => {
    handleApolloError(error);
  }, [error]);

  return { handleApolloError, handleGqlError };
};

export default useApolloErrorHandling;
