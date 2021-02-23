import React, { useMemo } from 'react';
import { ExpenseTypeType, PermissionType } from '../../../graphql';
import { useBreakpointValue, Flex, VStack } from '@chakra-ui/react';
import DeleteExpenseTypeAction from './DeleteExpenseTypeAction';
import UpdateExpenseTypeAction from './UpdateExpenseTypeAction';
import { greaterOrEqualPermission } from '../../../utils';

type Props = {
  expenseType: ExpenseTypeType;
  userPermission: PermissionType;
};

const ExpenseTypeActions: React.FC<Props> = ({ expenseType, userPermission }: Props) => {
  const display = useBreakpointValue([VStack, Flex, Flex, Flex]);
  const isProjectAdmin = useMemo(() => greaterOrEqualPermission(userPermission, PermissionType.Configure), [userPermission]);

  if (!isProjectAdmin) {
    return <p />;
  }

  return (
    <>
      <Flex>
        <Flex gridGap="0.25em" as={display}>
          <UpdateExpenseTypeAction expenseType={expenseType} />
          <DeleteExpenseTypeAction expenseTypeId={expenseType.id} />
        </Flex>
      </Flex>
    </>
  );
};

export default ExpenseTypeActions;
