import { Flex, Icon, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { FaStar } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroller';
import { useRouteMatch } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';
import { WideContent } from '../../../components/Content';
import DefaultSkelleton from '../../../components/DefaultSkelleton';
import TableWrapper from '../../../components/TableWrapper';
import { useExpensesQuery, useMeQuery, useProjectQuery } from '../../../graphql';
import withAuthentication from '../../../hoc/withAuthentication';
import useApolloErrorHandling from '../../../hooks/useApolloErrorHandling';
import ExpenseActions from './ExpenseActions';
import ExpensesHeading from './ExpensesHeading';

type RouteMatch = {
  projectId: string;
};

const pageSize = 20;

const Expenses = () => {
  const match = useRouteMatch<RouteMatch>();
  const { data: meData, error: meError } = useMeQuery();
  const { data: projectData, error: projectError } = useProjectQuery({ variables: { id: match.params.projectId } });
  const { data, fetchMore, error } = useExpensesQuery({
    variables: { filter: { projectId: Number(match.params.projectId), skip: 0, count: pageSize } },
  });

  useApolloErrorHandling(meError);
  useApolloErrorHandling(projectError);
  useApolloErrorHandling(error);

  const expenseTypeDict = useMemo(() => {
    return (
      projectData?.project.expenseTypes.reduce((dict, e) => {
        dict[e.id] = e.name;
        return dict;
      }, {} as Record<string, string>) ?? {}
    );
  }, [projectData]);

  const getExpenseTypeName = (typeId?: number | null) => {
    if (!typeId) {
      return '';
    }

    return expenseTypeDict[typeId];
  };

  if (!projectData || !data || !meData) {
    return <DefaultSkelleton />;
  }

  const loadMore = async () => {
    try {
      await fetchMore({
        variables: { filter: { count: pageSize, skip: data.expenses.entries.length, projectId: Number(match.params.projectId) } },
      });
    } catch (err) {
      console.error(err);
    }
  };

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
        loadMore={loadMore}
        hasMore={data.expenses.entries.length < data.expenses.count}
        loader={
          <Text color="brand.500" key={0}>
            Loading ...
          </Text>
        }
      >
        <TableWrapper>
          <Thead>
            <Tr>
              <Th>
                <Text>Name</Text>
              </Th>
              <Th>
                <Text>Date</Text>
              </Th>
              <Th>
                <Text>Type</Text>
              </Th>
              <Th>
                <Text>Amount</Text>
              </Th>
              <Th>
                <Text>Actions</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody overflowX="scroll">
            {data.expenses.entries.map((e) => (
              <Tr w="100%" key={e.id}>
                <Td overflow="hidden" color="brand.500" whiteSpace="nowrap" textOverflow="ellipsis" maxW={['10em', '10em', '13em', '20em']}>
                  {e.creatorUserId === meData.me.id ? <Icon mb="0.3em" as={FaStar} /> : null} {e.name}
                </Td>
                <Td>{new Date(e.dateAdded).toLocaleDateString()}</Td>
                <Td>{getExpenseTypeName(e.typeId)}</Td>
                <Td isNumeric>
                  {e.value} {projectData.project.currencyType}
                </Td>
                <Td isNumeric>
                  <Flex as="span" justifyContent="space-between">
                    <ExpenseActions
                      expenseTypes={projectData.project.expenseTypes}
                      currencyType={projectData.project.currencyType}
                      userPermission={projectData.project.userPermission}
                      expense={e}
                      currentUserId={meData.me.id}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableWrapper>
      </InfiniteScroll>
    </WideContent>
  );
};

export default withAuthentication(Expenses, DefaultSkelleton);
