import { ProjectsQuery, ProjectsType, useProjectsQuery } from '../graphql';
import useApolloErrorHandling from './useApolloErrorHandling';

type Filter = {
  skip: number;
  count: number;
};

type Result = {
    query: ProjectsQuery
}

const useProjects = (filter: Filter) => {
  const { data, fetchMore, error } = useProjectsQuery({ variables: { filter } });
  useApolloErrorHandling(error);

  const loadMore = (filter: Filter) => {
    fetchMore({variables: filter});
  }
};

export default useProjects;
