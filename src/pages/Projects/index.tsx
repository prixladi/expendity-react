import React from 'react';
import { useProjectsQuery } from '../../graphql';
import { Tbody, Td, Text, Th, Thead, Tr, Link } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroller';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import { WideContent } from '../../components/Content';
import { ProjectRoute } from '../../routes';
import withAuthentication from '../../hoc/withAuthentication';
import DefaultSkelleton from '../../components/DefaultSkelleton';
import ProjectsHeading from './ProjectsHeading';
import Actions from './Actions';
import { Link as RouterLink } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import TableWrapper from '../../components/TableWrapper';

const pageSize = 20;

const Projects: React.FC = () => {
  const { data, error, fetchMore } = useProjectsQuery({ variables: { filter: { count: pageSize, skip: 0 } } });
  useApolloErrorHandling(error);

  if (!data) {
    return <DefaultSkelleton />;
  }

  return (
    <WideContent>
      <Breadcrumb />
      <ProjectsHeading />
      <InfiniteScroll
        pageStart={0}
        loadMore={async () => {
          await fetchMore({ variables: { filter: { count: pageSize, skip: data.projects.entries.length } } });
        }}
        hasMore={data.projects.entries.length < data.projects.count}
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
                <Text>Currency</Text>
              </Th>
              <Th>
                <Text>Actions</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.projects.entries.map((p) => (
              <Tr w="100%" key={p.id}>
                <Td overflow="hidden" color="brand.500" whiteSpace="nowrap" textOverflow="ellipsis" maxW={['10em', '10em', '13em', '20em']}>
                  <Link as={RouterLink} to={ProjectRoute(p.id)}>
                    {p.name}
                  </Link>
                </Td>
                <Td>{p.currencyType}</Td>
                <Td maxW="7em">
                  <Actions project={p} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableWrapper>
      </InfiniteScroll>
    </WideContent>
  );
};

export default withAuthentication(Projects, DefaultSkelleton);
