import React from 'react';
import { Grid, Icon, Text as ChakraText, useBreakpointValue } from '@chakra-ui/react';
import { WideContent } from '../../components/Content';
import withAuthentication from '../../hoc/withAuthentication';
import DefaultSkelleton from '../../components/DefaultSkelleton';
import { PermissionType, useProjectQuery } from '../../graphql';
import { useHistory, useRouteMatch } from 'react-router-dom';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import H1 from '../../components/H1';
import Text from '../../components/Text';
import { Button } from '../../components/Button';
import { FaUserAlt } from 'react-icons/fa';
import { GiMoneyStack, GiPayMoney } from 'react-icons/gi';
import { BiStats } from 'react-icons/bi';
import { TiTicket } from 'react-icons/ti';
import H2 from '../../components/H2';
import InternalLink from '../../components/InternalLink';
import { ExpensesRoute, ExpenseTypesRoute, InvitesRoute, ProjectsRoute, UserPermissionsRoute } from '../../routes';
import Breadcrumb from '../../components/Breadcrumb';
import { greaterOrEqualPermission } from '../../utils';

type RouteMatch = {
  projectId: string;
};

const Project: React.FC = () => {
  const match = useRouteMatch<RouteMatch>();
  const history = useHistory();
  const { data, error } = useProjectQuery({ variables: { id: match.params.projectId } });
  useApolloErrorHandling(error);
  const columns = useBreakpointValue(['1fr', '1fr 1fr', '1fr 1fr 1fr', '1fr 1fr 1fr 1fr']);

  if (!data) {
    return <DefaultSkelleton />;
  }

  return (
    <>
      <WideContent>
        <Breadcrumb translations={{ [data.project.id]: data.project.name }} />
        <H1>{data.project.name}</H1>
        <ChakraText mb="1em" opacity="0.7" fontSize="1.4em">
          {data.project.description}
        </ChakraText>
        <H2>Control panel</H2>
        <Text>
          Using controls below you can manipulate project. Or go back to the <InternalLink href={ProjectsRoute}>project list</InternalLink>.
        </Text>
        <Grid mt="3em" gridGap=" 1em" templateColumns={columns}>
          <Button onClick={() => history.push(ExpensesRoute(data.project.id))} minW="10em">
            Expenses <Icon ml="0.2em" as={GiPayMoney} />
          </Button>
          <Button onClick={() => history.push(ExpenseTypesRoute(data.project.id))} minW="10em">
            Expense Types <Icon ml="0.2em" as={GiMoneyStack} />
          </Button>
          <Button onClick={() => history.push(UserPermissionsRoute(data.project.id))} minW="10em">
            User Permissions <Icon ml="0.2em" as={FaUserAlt} />
          </Button>
          {greaterOrEqualPermission(data.project.userPermission, PermissionType.Configure) ? (
            <Button onClick={() => history.push(InvitesRoute(data.project.id))} minW="10em">
              Project Invites <Icon ml="0.2em" as={TiTicket} />
            </Button>
          ) : null}
          <Button minW="10em">
            Statistics
            <Icon ml="0.2em" as={BiStats} />{' '}
          </Button>
        </Grid>
      </WideContent>
    </>
  );
};

export default withAuthentication(Project, DefaultSkelleton);
