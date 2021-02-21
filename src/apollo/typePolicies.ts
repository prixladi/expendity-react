import { TypePolicies } from '@apollo/client';
import { ProjectsType } from '../graphql';

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      projects: {
        // Don't cache separate results based on
        // any of this field's arguments.
        keyArgs: false,
        // Concatenate the incoming list items with
        // the existing list items.
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
    },
  },
};

export default typePolicies;
