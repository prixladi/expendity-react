import { useApolloClient } from '@apollo/client';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthorityManager } from '../authority';
import DefaultSkelleton from '../components/DefaultSkelleton';
import { signOut } from '../services/authorityService';

const Logout: React.FC = () => {
  const history = useHistory();
  const manager = useAuthorityManager();
  const apollo = useApolloClient();

  useEffect(() => {
    signOut(manager, history, apollo);
  }, [history, manager, apollo]);

  return <DefaultSkelleton />;
};

export default Logout;
