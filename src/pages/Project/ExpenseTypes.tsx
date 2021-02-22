import React from 'react';
import { useProjectQuery } from '../../graphql';
import { Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import { WideContent } from '../../components/Content';
import withAuthentication from '../../hoc/withAuthentication';
import DefaultSkelleton from '../../components/DefaultSkelleton';
import { useRouteMatch } from 'react-router-dom';
import useTableSize from '../../hooks/useTableSize';
import ExpeseTypesHeading from './ExpeseTypesHeading';
import Breadcrumb from '../../components/Breadcrumb';
import ExpenseTypeActions from './ExpenseTypeActions';

type RouteMatch = {
  projectId: string;
};

const Projects: React.FC = () => {
  const match = useRouteMatch<RouteMatch>();
  const tableSize = useTableSize();

  const { data, error } = useProjectQuery({ variables: { id: match.params.projectId }, errorPolicy: 'all' });
  useApolloErrorHandling(error);

  if (!data) {
    return null;
  }

  return (
    <WideContent>
      <Breadcrumb />
      <ExpeseTypesHeading projectId={Number(data.project.id)} userPermission={data.project.userPermission} />
      <Table textOverflow="ellipsis" size={tableSize} variant="striped">
        <Thead>
          <Tr>
            <Th>
              <Text>Name</Text>
            </Th>
            <Th>
              <Text>Actions</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.project.expenseTypes.map((e) => (
            <Tr w="100%" key={e.id}>
              <Td overflow="hidden" color="brand.500" whiteSpace="nowrap" textOverflow="ellipsis" maxW={['7em', '15em', '30em', '40em']}>
                {e.name}
              </Td>
              <Td maxW="7em">
                <ExpenseTypeActions expenseType={e} userPermission={data.project.userPermission} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </WideContent>
  );
};

export default withAuthentication(Projects, DefaultSkelleton);
