import React from 'react';
import { useProjectsQuery } from '../../graphql';
import { Table, Tbody, Td, Text, Th, Thead, Tr, Link, useBreakpointValue } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroller';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import { WideContent } from '../../components/Content';
import { ProjectRoute } from '../../routes';
import withAuthentication from '../../hoc/withAuthentication';
import DefaultSkelleton from '../../components/DefaultSkelleton';
import ProjectsHeading from './ProjectsHeading';
import Actions from './Actions';
import { Link as RouterLink } from 'react-router-dom';

const pageSize = 20;

const Projects: React.FC = () => {
  const tableSize = useBreakpointValue(['sm', 'md', 'md', 'lg']);

  const { data, error, fetchMore } = useProjectsQuery({ errorPolicy: 'all', variables: { filter: { count: pageSize, skip: 0 } } });
  useApolloErrorHandling(error);

  if (!data) {
    return null;
  }

  return (
    <WideContent>
      <>
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
          <Table textOverflow="ellipsis" size={tableSize} variant="striped">
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
                  <Td
                    overflow="hidden"
                    color="brand.500"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    maxW={['7em', '15em', '30em', '40em']}
                  >
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
          </Table>
        </InfiniteScroll>
      </>
    </WideContent>
  );
};

export default withAuthentication(Projects, DefaultSkelleton);
