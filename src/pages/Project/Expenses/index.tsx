import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useRouteMatch } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';
import { WideContent } from '../../../components/Content';
import DefaultSkelleton from '../../../components/DefaultSkelleton';
import { useExpensesQuery, useProjectQuery } from '../../../graphql';
import withAuthentication from '../../../hoc/withAuthentication';
import useTableSize from '../../../hooks/useTableSize';
import ExpensesHeading from './ExpensesHeading';

type RouteMatch = {
  projectId: string;
};

const pageSize = 20;

const Expenses = () => {
  const match = useRouteMatch<RouteMatch>();
  const tableSize = useTableSize();
  const { data: projectData } = useProjectQuery({ variables: { id: match.params.projectId } });
  const { data, fetchMore } = useExpensesQuery({
    variables: { filter: { projectId: Number(match.params.projectId), skip: 0, count: pageSize } },
  });

  if (!projectData || !data) {
    return <DefaultSkelleton />;
  }

  return (
    <WideContent>
      <Breadcrumb translations={{ [projectData.project.id]: projectData.project.name }} />
      <ExpensesHeading
        userPermission={projectData.project.userPermission}
        projectId={Number(projectData.project.id)}
        expenseTypes={projectData.project.expenseTypes}
        currencyType={projectData.project.currencyType}
      />

      <InfiniteScroll
        pageStart={0}
        loadMore={async () => {
          await fetchMore({
            variables: { filter: { count: pageSize, skip: data.expenses.entries.length, projectId: Number(match.params.projectId) } },
          });
        }}
        hasMore={data.expenses.entries.length < data.expenses.count}
        loader={
          <Text color="brand.500" key={0}>
            Loading ...
          </Text>
        }
      >
        <Table textOverflow="ellipsis" size={tableSize} variant="striped">
          <Thead>
            <Tr>
              <Th>
                <Text>Name</Text>
              </Th>
              <Th>
                <Text>Type</Text>
              </Th>
              <Th>
                <Text>Amount</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.expenses.entries.map((e) => (
              <Tr w="100%" key={e.id}>
                <Td overflow="hidden" color="brand.500" whiteSpace="nowrap" textOverflow="ellipsis" maxW={['7em', '10em', '13em', '20em']}>
                  {e.name}
                </Td>
                <Td>{e.typeId}</Td>
                <Td>
                  <Flex as="span" justifyContent="space-between">
                    {e.value} {projectData.project.currencyType}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </InfiniteScroll>
    </WideContent>
  );
};

export default withAuthentication(Expenses, DefaultSkelleton);
