import React, { useEffect } from 'react';
import { PermissionType, useProjectInvitesQuery, useProjectQuery } from '../../../graphql';
import { Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import useApolloErrorHandling from '../../../hooks/useApolloErrorHandling';
import { WideContent } from '../../../components/Content';
import withAuthentication from '../../../hoc/withAuthentication';
import DefaultSkelleton from '../../../components/DefaultSkelleton';
import { useHistory, useRouteMatch } from 'react-router-dom';
import useTableSize from '../../../hooks/useTableSize';
import Breadcrumb from '../../../components/Breadcrumb';
import InvitesHeading from './InvitesHeading';
import { AcceptInviteRoute, ProjectRoute } from '../../../routes';
import InviteDetailModal from './InviteDetailModal';
import InviteActions from './InviteActions';

type RouteMatch = {
  projectId: string;
};

const createUrl = (defaultUrl: string, token: string): string => {
  return new URL(AcceptInviteRoute(token), defaultUrl).href;
};

const Projects: React.FC = () => {
  const match = useRouteMatch<RouteMatch>();
  const tableSize = useTableSize();
  const { data: projectData, error: projectError } = useProjectQuery({ variables: { id: match.params.projectId }, errorPolicy: 'all' });
  const { data, error } = useProjectInvitesQuery({
    variables: { filter: { projectId: Number(match.params.projectId) } },
    errorPolicy: 'all',
  });
  const history = useHistory();

  useApolloErrorHandling(error);
  useApolloErrorHandling(projectError);

  useEffect(() => {
    if (
      projectData &&
      projectData.project.userPermission !== PermissionType.Configure &&
      projectData.project.userPermission !== PermissionType.Own
    ) {
      history.push(ProjectRoute(projectData.project.id));
    }
  }, [projectData, history]);

  if (!data || !projectData) {
    return null;
  }

  return (
    <WideContent>
      <Breadcrumb translations={{ [match.params.projectId]: projectData.project.name }} />
      <InvitesHeading projectId={Number(projectData.project.id)} userPermission={projectData.project.userPermission} />
      <Table textOverflow="ellipsis" size={tableSize} variant="striped">
        <Thead>
          <Tr>
            <Th>
              <Text>Url</Text>
            </Th>
            <Th>
              <Text>Actions</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.projectInvites.entries.map((i) => {
            const url = createUrl(window.location.href, i.token);

            return (
              <Tr w="100%" key={i.id}>
                <Td overflow="hidden" color="brand.500" whiteSpace="nowrap" textOverflow="ellipsis" maxW={['7em', '10em', '14em', '40em']}>
                  <InviteDetailModal inviteUrl={url} projectInvite={i} />
                </Td>
                <Td maxW="7em">
                  <InviteActions inviteId={i.id} inviteUrl={url} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </WideContent>
  );
};

export default withAuthentication(Projects, DefaultSkelleton);
