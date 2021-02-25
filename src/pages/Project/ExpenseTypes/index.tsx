import React from 'react';
import { useProjectQuery } from '../../../graphql';
import { Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import useApolloErrorHandling from '../../../hooks/useApolloErrorHandling';
import { WideContent } from '../../../components/Content';
import withAuthentication from '../../../hoc/withAuthentication';
import DefaultSkelleton from '../../../components/DefaultSkelleton';
import { useRouteMatch } from 'react-router-dom';
import ExpeseTypesHeading from './ExpenseTypesHeading';
import Breadcrumb from '../../../components/Breadcrumb';
import ExpenseTypeActions from './ExpenseTypeActions';
import ExpenseTypeDetailModal from './ExpenseTypeDetailModal';
import TableWrapper from '../../../components/TableWrapper';

type RouteMatch = {
  projectId: string;
};

const ExpenseTypes: React.FC = () => {
  const match = useRouteMatch<RouteMatch>();
  const { data, error } = useProjectQuery({ variables: { id: match.params.projectId } });
  useApolloErrorHandling(error);

  if (!data) {
    return <DefaultSkelleton />;
  }

  return (
    <WideContent>
      <Breadcrumb translations={{ [data.project.id]: data.project.name }} />
      <ExpeseTypesHeading projectId={Number(data.project.id)} userPermission={data.project.userPermission} />

      <TableWrapper>
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
                <ExpenseTypeDetailModal expenseType={e} />
              </Td>
              <Td maxW="7em">
                <ExpenseTypeActions expenseType={e} userPermission={data.project.userPermission} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableWrapper>
    </WideContent>
  );
};

export default withAuthentication(ExpenseTypes, DefaultSkelleton);
