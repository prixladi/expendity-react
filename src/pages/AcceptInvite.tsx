import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { WideContent } from '../components/Content';
import DefaultSkelleton from '../components/DefaultSkelleton';
import { useAcceptProjectInviteMutation, useProjectInviteByTokenQuery } from '../graphql';
import withAuthentication from '../hoc/withAuthentication';
import { HomeRoute, ProjectRoute } from '../routes';
import { Icon, Text as ChakraText } from '@chakra-ui/react';
import { invalidInviteNotification, inviteAcceptedNotification } from '../services/notificationService';
import H1 from '../components/H1';
import Text from '../components/Text';
import InternalLink from '../components/InternalLink';
import { FormikButton as Button } from '../components/Button';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import H2 from '../components/H2';
import useApolloErrorHandling from '../hooks/useApolloErrorHandling';

type RouteMatch = {
  token: string;
};

const AcceptInvite: React.FC = () => {
  const match = useRouteMatch<RouteMatch>();
  const history = useHistory();
  const { data, error } = useProjectInviteByTokenQuery({ variables: { token: match.params.token } });
  const [acceptInvite] = useAcceptProjectInviteMutation({ variables: { token: match.params.token } });
  const { handleGqlError } = useApolloErrorHandling(error);

  useEffect(() => {
    if (error) {
      console.error(error);
      invalidInviteNotification();
      history.push(HomeRoute);
    }
  }, [error, history]);

  if (!data) {
    return <DefaultSkelleton />;
  }

  const onClick = async () => {
    try {
      const { data, errors } = await acceptInvite({ variables: { token: match.params.token } });
      handleGqlError(errors);

      if (data) {
        inviteAcceptedNotification();
        history.push(ProjectRoute(data.acceptProjectInvite.projectId.toString()));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WideContent>
      <H1>Project Invite</H1>
      <Text mb="0.7em">You have been invited to join Project:</Text>
      <H2>{data.projectInviteByToken.projectName}</H2>
      <ChakraText mb="1em" opacity="0.7" fontSize="1.4em">
        {data.projectInviteByToken.projectDescription}
      </ChakraText>
      <Text>
        If you wish to join this project click button below. Otherwise go back to <InternalLink href={HomeRoute}>project list</InternalLink>
        .
      </Text>
      <Button mt="1em" onClick={onClick}>
        Join Project <Icon ml="0.2em" mt="0.2em" as={AiOutlineFundProjectionScreen} />
      </Button>
    </WideContent>
  );
};

export default withAuthentication(AcceptInvite, DefaultSkelleton);
