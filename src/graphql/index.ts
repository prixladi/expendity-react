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
  id: Scalars['Int'];
};


export type QueryExpensesArgs = {
  filter: ExpenseFilterInputType;
};


export type QueryExpenseTypeArgs = {
  id: Scalars['Int'];
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};


export type QueryProjectInviteArgs = {
  id: Scalars['Int'];
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
  id?: Maybe<Scalars['ID']>;
  type: PermissionType;
  userEmail: Scalars['String'];
  userId: Scalars['Int'];
};

export type ExpenseTypeType = {
  __typename?: 'ExpenseTypeType';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
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
  id?: Maybe<Scalars['ID']>;
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
  id?: Maybe<Scalars['ID']>;
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
  id?: Maybe<Scalars['ID']>;
  isMultiUse: Scalars['Boolean'];
  projectId: Scalars['Int'];
  projectPermissionType: PermissionType;
  token: Scalars['String'];
};

export type ProjectInvitePreviewType = {
  __typename?: 'ProjectInvitePreviewType';
  id?: Maybe<Scalars['ID']>;
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
  id: Scalars['Int'];
};


export type MutationDeleteExpenseTypeArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProjectInviteArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProjectPermissionArgs = {
  projectId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationUpdateExpenseArgs = {
  id: Scalars['Int'];
  update: ExpenseUpdateInputType;
};


export type MutationUpdateExpenseTypeArgs = {
  id: Scalars['Int'];
  update: ExpenseTypeUpdateInputType;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['Int'];
  update: ProjectUpdateInputType;
};


export type MutationUpdateProjectPermissionArgs = {
  projectId: Scalars['Int'];
  userId: Scalars['Int'];
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

export type ExchangeRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExchangeRatesQuery = (
  { __typename?: 'Query' }
  & { exchangeRates: (
    { __typename?: 'ExchangeRatesType' }
    & ExchangeRatesFieldsFragment
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