/* eslint-disable */

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Decimal: any;
  Long: any;
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  /** Exchange rates that could be used for as reference for exchanging between currencies. */
  exchangeRates: ExchangeRatesType;
  expense: ExpenseType;
  expenses: ExpensesType;
  expenseType: ExpenseTypeType;
  me: MeType;
  project: ProjectDetailType;
  projectInvite: ProjectInviteType;
  projectInviteByToken: ProjectInvitePreviewType;
  projectInvites: ProjectInvitesType;
  projects: ProjectsType;
  summary: SummaryType;
};


export type QueryExpenseArgs = {
  id: Scalars['ID'];
};


export type QueryExpensesArgs = {
  filter: ExpenseFilterInputType;
};


export type QueryExpenseTypeArgs = {
  id: Scalars['ID'];
};


export type QueryProjectArgs = {
  id: Scalars['ID'];
};


export type QueryProjectInviteArgs = {
  id: Scalars['ID'];
};


export type QueryProjectInviteByTokenArgs = {
  token: Scalars['String'];
};


export type QueryProjectInvitesArgs = {
  filter: ProjectInviteFilterInputType;
};


export type QueryProjectsArgs = {
  filter: ProjectFilterInputType;
};


export type QuerySummaryArgs = {
  filter: SummaryFilterInputType;
};

export type MeType = {
  __typename?: 'MeType';
  email: Scalars['String'];
  id: Scalars['Int'];
  subjectId: Scalars['String'];
  username: Scalars['String'];
};

export type ExchangeRatesType = {
  __typename?: 'ExchangeRatesType';
  baseCurrency: CurrencyType;
  entries: Array<ExchangeRateType>;
};

export enum CurrencyType {
  Eur = 'EUR',
  Usd = 'USD',
  Czk = 'CZK'
}

export type ExchangeRateType = {
  __typename?: 'ExchangeRateType';
  currencyType: CurrencyType;
  rate: Scalars['Decimal'];
};


export type ProjectDetailType = {
  __typename?: 'ProjectDetailType';
  currencyType: CurrencyType;
  description?: Maybe<Scalars['String']>;
  expenseTypes: Array<ExpenseTypeType>;
  id: Scalars['Int'];
  name: Scalars['String'];
  permissions: Array<ProjectPermissionType>;
  /** Current user's permission for project. */
  userPermission: PermissionType;
};

export enum PermissionType {
  View = 'VIEW',
  Control = 'CONTROL',
  Configure = 'CONFIGURE',
  Own = 'OWN'
}

export type ProjectPermissionType = {
  __typename?: 'ProjectPermissionType';
  id: Scalars['ID'];
  type: PermissionType;
  userEmail: Scalars['String'];
  userId: Scalars['Int'];
};

export type ExpenseTypeType = {
  __typename?: 'ExpenseTypeType';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  projectId: Scalars['Int'];
};

export type ProjectsType = {
  __typename?: 'ProjectsType';
  count: Scalars['Long'];
  entries: Array<ProjectType>;
};


export type ProjectType = {
  __typename?: 'ProjectType';
  currencyType: CurrencyType;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Current user's permission for project. */
  userPermission: PermissionType;
};

export type ProjectFilterInputType = {
  skip: Scalars['Int'];
  count: Scalars['Int'];
};

export type ExpenseType = {
  __typename?: 'ExpenseType';
  addedUtc: Scalars['DateTime'];
  creatorUserEmail: Scalars['String'];
  creatorUserId: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastUpdaterUserEmail?: Maybe<Scalars['String']>;
  lastUpdaterUserId?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  projectId: Scalars['Int'];
  typeId?: Maybe<Scalars['Int']>;
  value: Scalars['Decimal'];
};


export type ExpensesType = {
  __typename?: 'ExpensesType';
  count: Scalars['Long'];
  entries: Array<ExpenseType>;
};

export type ExpenseFilterInputType = {
  skip: Scalars['Int'];
  count: Scalars['Int'];
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
  projectId: Scalars['Int'];
};

export type SummaryType = {
  __typename?: 'SummaryType';
  entries: Array<SummaryEntryType>;
  fullSum: Scalars['Decimal'];
};

export type SummaryEntryType = {
  __typename?: 'SummaryEntryType';
  expenseTypeId?: Maybe<Scalars['Int']>;
  sum: Scalars['Decimal'];
};

export type SummaryFilterInputType = {
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
  projectId: Scalars['Int'];
};

export type ProjectInviteType = {
  __typename?: 'ProjectInviteType';
  id: Scalars['ID'];
  isMultiUse: Scalars['Boolean'];
  projectId: Scalars['Int'];
  projectPermissionType: PermissionType;
  token: Scalars['String'];
};

export type ProjectInvitePreviewType = {
  __typename?: 'ProjectInvitePreviewType';
  id: Scalars['ID'];
  projectDescription?: Maybe<Scalars['String']>;
  projectId: Scalars['Int'];
  projectName: Scalars['String'];
  projectPermissionType: PermissionType;
};

export type ProjectInvitesType = {
  __typename?: 'ProjectInvitesType';
  count: Scalars['Long'];
  entries: Array<ProjectInviteType>;
};

export type ProjectInviteFilterInputType = {
  count: Scalars['Int'];
  skip: Scalars['Int'];
  projectId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptProjectInvite: ProjectPermissionType;
  changeProjectCurrency: ProjectCurrencyChangedType;
  createExpense: ExpenseType;
  createExpenseType: ExpenseTypeType;
  createProject: ProjectType;
  createProjectInvite: ProjectInviteType;
  deleteExpense: ExpenseType;
  deleteExpenseType: ExpenseTypeType;
  deleteProject: ProjectType;
  deleteProjectInvite: ProjectInviteType;
  deleteProjectPermission: ProjectPermissionType;
  updateExpense: ExpenseType;
  updateExpenseType: ExpenseTypeType;
  updateProject: ProjectType;
  updateProjectPermission: ProjectPermissionType;
};


export type MutationAcceptProjectInviteArgs = {
  token: Scalars['String'];
};


export type MutationChangeProjectCurrencyArgs = {
  model: ChangeProjectCurrencyInputType;
};


export type MutationCreateExpenseArgs = {
  expense: ExpenseInputType;
};


export type MutationCreateExpenseTypeArgs = {
  expenseType: ExpenseTypeInputType;
};


export type MutationCreateProjectArgs = {
  project: ProjectInputType;
};


export type MutationCreateProjectInviteArgs = {
  projectInvite: ProjectInviteInputType;
};


export type MutationDeleteExpenseArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteExpenseTypeArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProjectInviteArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProjectPermissionArgs = {
  projectId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationUpdateExpenseArgs = {
  id: Scalars['ID'];
  update: ExpenseUpdateInputType;
};


export type MutationUpdateExpenseTypeArgs = {
  id: Scalars['ID'];
  update: ExpenseTypeUpdateInputType;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID'];
  update: ProjectUpdateInputType;
};


export type MutationUpdateProjectPermissionArgs = {
  projectId: Scalars['ID'];
  userId: Scalars['ID'];
  update: ProjectPermissionUpdateInputType;
};

export type ProjectCurrencyChangedType = {
  __typename?: 'ProjectCurrencyChangedType';
  expensesChangedCount: Scalars['Long'];
  newCurrencyType: CurrencyType;
  oldCurrencyType: CurrencyType;
};

export type ChangeProjectCurrencyInputType = {
  projectId: Scalars['Int'];
  rate: Scalars['Decimal'];
  newCurrencyType: CurrencyType;
};

export type ProjectInputType = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  currencyType: CurrencyType;
};

export type ProjectUpdateInputType = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type ExpenseTypeInputType = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  projectId: Scalars['Int'];
};

export type ExpenseTypeUpdateInputType = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type ExpenseInputType = {
  name: Scalars['String'];
  value: Scalars['Decimal'];
  description?: Maybe<Scalars['String']>;
  addedUtc?: Maybe<Scalars['DateTime']>;
  typeId?: Maybe<Scalars['Int']>;
  projectId: Scalars['Int'];
};

export type ExpenseUpdateInputType = {
  name: Scalars['String'];
  value: Scalars['Decimal'];
  description?: Maybe<Scalars['String']>;
  addedUtc?: Maybe<Scalars['DateTime']>;
  typeId?: Maybe<Scalars['Int']>;
};

export type ProjectInviteInputType = {
  isMultiUse: Scalars['Boolean'];
  projectId: Scalars['Int'];
  projectPermissionType: PermissionType;
};

export type ProjectPermissionUpdateInputType = {
  type: PermissionType;
};

export type ExchangeRateFieldsFragment = (
  { __typename?: 'ExchangeRateType' }
  & Pick<ExchangeRateType, 'currencyType' | 'rate'>
);

export type ExchangeRatesFieldsFragment = (
  { __typename?: 'ExchangeRatesType' }
  & Pick<ExchangeRatesType, 'baseCurrency'>
  & { entries: Array<(
    { __typename?: 'ExchangeRateType' }
    & ExchangeRateFieldsFragment
  )> }
);

export type ExpenseTypeFieldsFragment = (
  { __typename?: 'ExpenseTypeType' }
  & Pick<ExpenseTypeType, 'description' | 'id' | 'name'>
);

export type ProjectDetailFieldsFragment = (
  { __typename?: 'ProjectDetailType' }
  & Pick<ProjectDetailType, 'id' | 'currencyType' | 'description' | 'name' | 'userPermission'>
  & { expenseTypes: Array<(
    { __typename?: 'ExpenseTypeType' }
    & ExpenseTypeFieldsFragment
  )>, permissions: Array<(
    { __typename?: 'ProjectPermissionType' }
    & ProjectPermissionTypeFieldsFragment
  )> }
);

export type ProjectFieldsFragment = (
  { __typename?: 'ProjectType' }
  & Pick<ProjectType, 'currencyType' | 'description' | 'id' | 'name' | 'userPermission'>
);

export type ProjectPermissionTypeFieldsFragment = (
  { __typename?: 'ProjectPermissionType' }
  & Pick<ProjectPermissionType, 'id' | 'type' | 'userEmail' | 'userId'>
);

export type ProjectsFieldsFragment = (
  { __typename?: 'ProjectsType' }
  & Pick<ProjectsType, 'count'>
  & { entries: Array<(
    { __typename?: 'ProjectType' }
    & ProjectFieldsFragment
  )> }
);

export type CreateProjectMutationVariables = Exact<{
  project: ProjectInputType;
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'ProjectType' }
    & ProjectFieldsFragment
  ) }
);

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & { deleteProject: (
    { __typename?: 'ProjectType' }
    & ProjectFieldsFragment
  ) }
);

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['ID'];
  update: ProjectUpdateInputType;
}>;


export type UpdateProjectMutation = (
  { __typename?: 'Mutation' }
  & { updateProject: (
    { __typename?: 'ProjectType' }
    & ProjectFieldsFragment
  ) }
);

export type ExchangeRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExchangeRatesQuery = (
  { __typename?: 'Query' }
  & { exchangeRates: (
    { __typename?: 'ExchangeRatesType' }
    & ExchangeRatesFieldsFragment
  ) }
);

export type ProjectQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { project: (
    { __typename?: 'ProjectDetailType' }
    & ProjectDetailFieldsFragment
  ) }
);

export type ProjectsQueryVariables = Exact<{
  filter: ProjectFilterInputType;
}>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: (
    { __typename?: 'ProjectsType' }
    & ProjectsFieldsFragment
  ) }
);

export const ExchangeRateFieldsFragmentDoc = gql`
    fragment exchangeRateFields on ExchangeRateType {
  currencyType
  rate
}
    `;
export const ExchangeRatesFieldsFragmentDoc = gql`
    fragment exchangeRatesFields on ExchangeRatesType {
  baseCurrency
  entries {
    ...exchangeRateFields
  }
}
    ${ExchangeRateFieldsFragmentDoc}`;
export const ExpenseTypeFieldsFragmentDoc = gql`
    fragment expenseTypeFields on ExpenseTypeType {
  description
  id
  name
}
    `;
export const ProjectPermissionTypeFieldsFragmentDoc = gql`
    fragment projectPermissionTypeFields on ProjectPermissionType {
  id
  type
  userEmail
  userId
}
    `;
export const ProjectDetailFieldsFragmentDoc = gql`
    fragment projectDetailFields on ProjectDetailType {
  id
  currencyType
  description
  name
  userPermission
  expenseTypes {
    ...expenseTypeFields
  }
  permissions {
    ...projectPermissionTypeFields
  }
}
    ${ExpenseTypeFieldsFragmentDoc}
${ProjectPermissionTypeFieldsFragmentDoc}`;
export const ProjectFieldsFragmentDoc = gql`
    fragment projectFields on ProjectType {
  currencyType
  description
  id
  name
  userPermission
}
    `;
export const ProjectsFieldsFragmentDoc = gql`
    fragment projectsFields on ProjectsType {
  count
  entries {
    ...projectFields
  }
}
    ${ProjectFieldsFragmentDoc}`;
export const CreateProjectDocument = gql`
    mutation createProject($project: ProjectInputType!) {
  createProject(project: $project) {
    ...projectFields
  }
}
    ${ProjectFieldsFragmentDoc}`;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, baseOptions);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation deleteProject($id: ID!) {
  deleteProject(id: $id) {
    ...projectFields
  }
}
    ${ProjectFieldsFragmentDoc}`;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, baseOptions);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation updateProject($id: ID!, $update: ProjectUpdateInputType!) {
  updateProject(id: $id, update: $update) {
    ...projectFields
  }
}
    ${ProjectFieldsFragmentDoc}`;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      update: // value for 'update'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, baseOptions);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const ExchangeRatesDocument = gql`
    query exchangeRates {
  exchangeRates {
    ...exchangeRatesFields
  }
}
    ${ExchangeRatesFieldsFragmentDoc}`;

/**
 * __useExchangeRatesQuery__
 *
 * To run a query within a React component, call `useExchangeRatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExchangeRatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExchangeRatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useExchangeRatesQuery(baseOptions?: Apollo.QueryHookOptions<ExchangeRatesQuery, ExchangeRatesQueryVariables>) {
        return Apollo.useQuery<ExchangeRatesQuery, ExchangeRatesQueryVariables>(ExchangeRatesDocument, baseOptions);
      }
export function useExchangeRatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExchangeRatesQuery, ExchangeRatesQueryVariables>) {
          return Apollo.useLazyQuery<ExchangeRatesQuery, ExchangeRatesQueryVariables>(ExchangeRatesDocument, baseOptions);
        }
export type ExchangeRatesQueryHookResult = ReturnType<typeof useExchangeRatesQuery>;
export type ExchangeRatesLazyQueryHookResult = ReturnType<typeof useExchangeRatesLazyQuery>;
export type ExchangeRatesQueryResult = Apollo.QueryResult<ExchangeRatesQuery, ExchangeRatesQueryVariables>;
export const ProjectDocument = gql`
    query project($id: ID!) {
  project(id: $id) {
    ...projectDetailFields
  }
}
    ${ProjectDetailFieldsFragmentDoc}`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectsDocument = gql`
    query projects($filter: ProjectFilterInputType!) {
  projects(filter: $filter) {
    ...projectsFields
  }
}
    ${ProjectsFieldsFragmentDoc}`;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useProjectsQuery(baseOptions: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;