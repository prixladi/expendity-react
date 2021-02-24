import { TypePolicies } from '@apollo/client';
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
        keyArgs: false,
        merge(existing: ExpensesType | undefined, incoming: ExpensesType): ExpensesType {
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
    },
  },
  ProjectDetailType: {
    fields: {
      expenseTypes: {
        merge: false,
      },
    },
  },
};

export default typePolicies;
