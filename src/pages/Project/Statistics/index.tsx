import { Container, Grid } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { WideContent } from '../../../components/Content';
import DefaultSkelleton from '../../../components/DefaultSkelleton';
import H1 from '../../../components/H1';
import { ExpenseTypeType, useProjectQuery, useSummaryQuery } from '../../../graphql';
import useApolloErrorHandling from '../../../hooks/useApolloErrorHandling';
import InfoText from '../../../components/Text';
import { PieChart, Tooltip, Pie } from 'recharts';
import Breadcrumb from '../../../components/Breadcrumb';

type RouteMatch = {
  projectId: string;
};

const UserPermissions: React.FC = () => {
  const match = useRouteMatch<RouteMatch>();
  const { data: projectData, error: projectError } = useProjectQuery({ variables: { id: match.params.projectId } });
  const { data, error } = useSummaryQuery({ variables: { filter: { projectId: Number(match.params.projectId) } } });

  useApolloErrorHandling(projectError);
  useApolloErrorHandling(error);

  const chartValues = useMemo(() => {
    if (!data || !projectData) {
      return null;
    }

    const dict: Record<string, ExpenseTypeType> = {};
    projectData.project.expenseTypes.forEach((e) => {
      dict[e.id] = e;
    });

    return data.summary.entries.slice(0, 8).map((x) => {
      const expenseType = x.expenseTypeId ? dict[x.expenseTypeId] : null;

      return {
        name: expenseType?.name ?? 'Unspecified',
        value: x.sum,
      };
    });
  }, [data, projectData]);

  if (!chartValues || !data || !projectData) {
    return <DefaultSkelleton />;
  }

  return (
    <WideContent>
      <Breadcrumb translations={{ [projectData.project.id]: projectData.project.name }} />
      <H1>Expense Statistics</H1>

      <InfoText>In this section you can create and customize charts of your expenses.</InfoText>
      <Grid pt="1em" gridGap="5em">
        <Container>
          <PieChart width={400} height={400}>
            <Pie
              data={chartValues}
              dataKey="value"
              nameKey="name"
              innerRadius={100}
              outerRadius={130}
              fill="#82ca9d"
              label={(data) => data.name}
            />
            <Tooltip />
          </PieChart>
        </Container>
      </Grid>
    </WideContent>
  );
};

export default UserPermissions;
