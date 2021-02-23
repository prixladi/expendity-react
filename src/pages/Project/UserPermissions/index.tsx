import React from 'react';
import { PermissionType, useMeQuery, useProjectQuery } from '../../../graphql';
import { Icon, Table, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from '@chakra-ui/react';
import useApolloErrorHandling from '../../../hooks/useApolloErrorHandling';
import { WideContent } from '../../../components/Content';
import withAuthentication from '../../../hoc/withAuthentication';
import DefaultSkelleton from '../../../components/DefaultSkelleton';
import { useRouteMatch } from 'react-router-dom';
import useTableSize from '../../../hooks/useTableSize';
import Breadcrumb from '../../../components/Breadcrumb';
import H1 from '../../../components/H1';
import InfoText from '../../../components/Text';
import UserPermissionsUpdates from './UserPermissionsUpdates';
import { toReadableString } from '../../../utils';
import { FaStar } from 'react-icons/fa';
import UserPermissionActions from './UserPermissionActions';

type RouteMatch = {
  projectId: string;
};

const UserPermissions: React.FC = () => {
  const match = useRouteMatch<RouteMatch>();
  const tableSize = useTableSize();
  const { data, error } = useProjectQuery({ variables: { id: match.params.projectId }, errorPolicy: 'all' });
  const { data: meData, error: meError } = useMeQuery({ errorPolicy: 'all' });

  useApolloErrorHandling(error);
  useApolloErrorHandling(meError);

  if (!data || !meData) {
    return <DefaultSkelleton />;
  }

  return (
    <WideContent>
      <Breadcrumb translations={{ [data.project.id]: data.project.name }} />
      <H1>User Permissions</H1>

      <InfoText>
        Bellow is list of user permissions for current project, permission level determines what actions can user perform. You can change
        other user's permission if they have lesser or equal permission to you and you have at least '
        {toReadableString(PermissionType.Configure)}' Permission.
      </InfoText>

      <Table mt="0.5em" textOverflow="ellipsis" size={tableSize} variant="striped">
        <Thead>
          <Tr>
            <Th>
              <Text>Email</Text>
            </Th>
            <Th>
              <Text>Permission</Text>
            </Th>
            <Th>
              <Text>Actions</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.project.permissions.map((p) => (
            <Tr w="100%" key={p.id}>
              <Td overflow="hidden" color="brand.500" whiteSpace="nowrap" textOverflow="ellipsis" maxW={['7em', '12em', '12em', '40em']}>
                <Tooltip label={p.userEmail}>
                  <span>
                    {p.userId === meData.me.id ? <Icon mb="0.3em" as={FaStar} /> : null} {p.userEmail}
                  </span>
                </Tooltip>
              </Td>
              <Td maxW={['2em', '4em', '20em', '17em']}>
                <UserPermissionsUpdates
                  isCurrentUser={p.userId === meData.me.id}
                  permission={p}
                  currentUserPermission={data.project.userPermission}
                  projectId={data.project.id}
                />
              </Td>
              <Td maxW={['1.5em', '1.5em', '2em', '2em']}>
                <UserPermissionActions
                  isCurrentUser={p.userId === meData.me.id}
                  permission={p}
                  currentUserPermission={data.project.userPermission}
                  projectId={data.project.id}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </WideContent>
  );
};

export default withAuthentication(UserPermissions, DefaultSkelleton);
