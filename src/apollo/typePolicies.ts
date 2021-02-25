import { FieldFunctionOptions, TypePolicies } from '@apollo/client';
import { ExpensesType, ProjectsType } from '../graphql';

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      projects: {
        keyArgs: false,
        merge(existing: ProjectsType | undefined, incoming: ProjectsType): ProjectsType {
          if (!existing) {
            return incoming;
          }

          return {
            __typename: incoming.__typename,
            count: incoming.count,
            entries: [...existing.entries, ...incoming.entries],
          };
        },
      },
      expenses: {
        keyArgs: (a: Record<string, Record<string, string>> | null): string => {
          const filter = a?.filter;
          const projectId = filter?.projectId;
          return JSON.stringify({ projectId: projectId?.toString() });
        },
        merge(existing: ExpensesType | undefined, incoming: ExpensesType, { variables }: FieldFunctionOptions): ExpensesType {
          if (!existing) {
            return incoming;
          }

          // Special case after addition of new expense
          if (!variables || !variables.filter || !variables.filter.count) {
            return {
              __typename: incoming.__typename,
              count: incoming.count,
              entries: [...incoming.entries, ...existing.entries],
            };
          }

          return {
            __typename: incoming.__typename,
            count: incoming.count,
            entries: [...existing.entries, ...incoming.entries],
          };
        },
      },
    },
  },
  ProjectDetailType: {
    fields: {
      expenseTypes: {
        // always take new
        merge: false,
      },
    },
  },
};

export default typePolicies;
