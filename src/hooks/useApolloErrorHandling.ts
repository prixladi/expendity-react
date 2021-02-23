import { ApolloError, useApolloClient } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthorityManager } from '../authority';
import { onForbidden, onUnauthorized, ReturnPathState } from '../services/authorityService';
import { apiServerErrorNotification } from '../services/notificationService';

type Return = {
  handleApolloError: (error?: ApolloError) => void;
  handleGqlError: (error?: readonly GraphQLError[]) => void;
};

const useApolloErrorHandling = (error?: ApolloError): Return => {
  const apollo = useApolloClient();
  const history = useHistory<ReturnPathState>();
  const manager = useAuthorityManager();

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
      }
      if (
        error.some((e) => {
          if (!e.extensions || !e.extensions['number']) {
            return false;
          }

          return (e.extensions['number'] as string) === 'authorization';
        })
      ) {
        onUnauthorized(manager, history, apollo);
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
