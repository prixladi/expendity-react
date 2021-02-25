import { Breadcrumb } from '@chakra-ui/react';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { WideContent } from '../../../components/Content';
import DefaultSkelleton from '../../../components/DefaultSkelleton';
import H1 from '../../../components/H1';
import { useProjectQuery } from '../../../graphql';
import useApolloErrorHandling from '../../../hooks/useApolloErrorHandling';
import InfoText from '../../../components/Text';
import { PieChart } from 'recharts';

type RouteMatch = {
  projectId: string;
};

const UserPermissions: React.FC = () => {
  const match = useRouteMatch<RouteMatch>();
  const { data: projectData, error: projectError } = useProjectQuery({ variables: { id: match.params.projectId } });

  useApolloErrorHandling(projectError);

  if (!projectData) {
    return <DefaultSkelleton />;
  }

  return (
    <WideContent>
      <Breadcrumb translations={{ [projectData.project.id]: projectData.project.name }} />
      <H1>User Permissions</H1>

      <InfoText>
        Below is list of user permissions for current project, permission level determines what actions can user perform. You can change
        other user's permission if they have lesser or equal permission to you and you have at least ';
      </InfoText>
    </WideContent>
  );
};

export default UserPermissions;
