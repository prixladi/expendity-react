import React from 'react';
import { useProjectsQuery } from '../graphql';
import { Heading, Table, Tbody, Td, Text, Th, Thead, Tr, Link, useDisclosure, Box, Icon, useBreakpointValue } from '@chakra-ui/react';
import InfoText from '../components/Text';
import InfiniteScroll from 'react-infinite-scroller';
import useApolloErrorHandling from '../hooks/useApolloErrorHandling';
import { WideContent } from '../components/Content';
import { useHistory } from 'react-router-dom';
import { ProjectRoute } from '../routes';
import { Button } from '../components/Button';
import NewProjectModal from './NewProjectModal';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import withAuthentication from '../hoc/withAuthentication';
import DefaultSkelleton from '../components/DefaultSkelleton';

const pageSize = 20;

const shortenName = (name: string, maxL?: number | null) => {
  if (!maxL || name.length <= maxL) {
    return name;
  }

  return `${name.substr(0, maxL - 3)}...`;
};

const Projects: React.FC = () => {
  const history = useHistory();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const tableSize = useBreakpointValue(['sm', 'md', 'md', 'lg']);
  const nameMaxL = useBreakpointValue([10, 20, 30, 0]);

  const { data, error, fetchMore } = useProjectsQuery({ variables: { filter: { count: pageSize, skip: 0 } } });
  useApolloErrorHandling(error);

  if (!data) {
    return null;
  }

  return (
    <WideContent>
      <>
        <Heading as="h1" mb="0.5em">
          Your projects
        </Heading>

        <InfoText>
          Bellow is table of projects you have permissions to access. Here you can create new project or edit existing. By clicking on name of
          the project you will go to detail.
        </InfoText>

        <Box mt="1em" mb="0.7em">
          <Button onClick={onOpen}>
            Add new Project <Icon ml="0.2em" as={AiOutlineFundProjectionScreen} />
          </Button>
        </Box>

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
          <Table size={tableSize} variant="striped">
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
                <Tr key={p.id}>
                  <Td>
                    <Link onClick={() => history.push(ProjectRoute(p.id))} color="brand.500">
                      {shortenName(p.name, nameMaxL)}
                    </Link>
                  </Td>
                  <Td>{p.currencyType}</Td>
                  <Td>{p.userPermission}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <NewProjectModal onClose={onClose} isOpen={isOpen} />
        </InfiniteScroll>
      </>
    </WideContent>
  );
};

export default withAuthentication(Projects, DefaultSkelleton);
