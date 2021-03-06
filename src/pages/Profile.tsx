import React from 'react';
import { NarrowContent } from '../components/Content';
import DefaultSkelleton from '../components/DefaultSkelleton';
import H1 from '../components/H1';
import { useMeQuery } from '../graphql';
import useApolloErrorHandling from '../hooks/useApolloErrorHandling';
import Text from '../components/Text';
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';
import { LogoutRoute } from '../routes';
import { Icon } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

const Profile: React.FC = () => {
  const { data, error } = useMeQuery();
  useApolloErrorHandling(error);
  const history = useHistory();

  if (!data) {
    return <DefaultSkelleton />;
  }

  return (
    <NarrowContent>
      <H1>Profile</H1>
      <Text>Updating user properties is not supported yet.</Text>{' '}
      <pre>
        <code>{JSON.stringify(data.me, null, 2)} </code>
      </pre>
      <Button onClick={() => history.push(LogoutRoute)}>
        Logout <Icon ml="0.2em" as={FaSignOutAlt} />
      </Button>
    </NarrowContent>
  );
};

export default Profile;
