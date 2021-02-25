import React, { useMemo } from 'react';
import { CurrencyType, ExpenseType, ExpenseTypeType, PermissionType } from '../../../graphql';
import { useBreakpointValue, Flex, VStack } from '@chakra-ui/react';
import DeleteExpenseTypeAction from './DeleteExpenseAction';
import { greaterOrEqualPermission } from '../../../utils';
import UpdateExpenseAction from './UpdateExpenseAction';

type Props = {
  userPermission: PermissionType;
  expense: ExpenseType;
  expenseTypes: ExpenseTypeType[];
  currencyType: CurrencyType;
  currentUserId: number;
};

const ExpenseActions: React.FC<Props> = ({ expense, userPermission, expenseTypes, currencyType, currentUserId }: Props) => {
  const display = useBreakpointValue([VStack, Flex, Flex, Flex]);
  const canOperate = useMemo(() => {
    if (userPermission === PermissionType.View) {
      return false;
    }

    if (expense.creatorUserId === currentUserId) {
      return true;
    }

    return greaterOrEqualPermission(userPermission, PermissionType.Configure);
  }, [userPermission, currentUserId, expense]);

  if (!canOperate) {
    return <p />;
  }

  return (
    <>
      <Flex>
        <Flex gridGap="0.25em" as={display}>
          <UpdateExpenseAction expense={expense} expenseTypes={expenseTypes} currencyType={currencyType} />
          <DeleteExpenseTypeAction expenseId={expense.id} />
        </Flex>
      </Flex>
    </>
  );
};

export default ExpenseActions;
