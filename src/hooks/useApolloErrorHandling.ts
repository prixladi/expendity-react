import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { useEffect } from 'react';
import { apiServerErrorNotification } from '../services/notificationService';

const handleApolloError = (error?: ApolloError) => {
  if (error) {
    console.error(error);
    apiServerErrorNotification();
  }
};

const handleGqlError = (error?: readonly GraphQLError[]) => {
  if (error) {
    console.error(error);
    apiServerErrorNotification();
  }
};

type Return = {
  handleApolloError: typeof handleApolloError;
  handleGqlError: typeof handleGqlError;
};

const useApolloErrorHandling = (error?: ApolloError): Return => {
  useEffect(() => {
    handleApolloError(error);
  }, [error]);

  return { handleApolloError, handleGqlError };
};

export default useApolloErrorHandling;
