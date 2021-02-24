import React, { useMemo } from 'react';
import { useDisclosure, Box, Icon } from '@chakra-ui/react';
import InfoText from '../../../components/Text';
import { Button } from '../../../components/Button';
import H1 from '../../../components/H1';
import { CurrencyType, ExpenseTypeType, PermissionType } from '../../../graphql';
import { greaterOrEqualPermission, toReadableString } from '../../../utils';
import { GiPayMoney } from 'react-icons/gi';
import NewExpenseModal from './NewExpenseModal';

type Props = {
  userPermission: PermissionType;
  projectId: number;
  expenseTypes: ExpenseTypeType[];
  currencyType: CurrencyType;
};

const ExpensesHeading: React.FC<Props> = ({ userPermission, projectId, expenseTypes, currencyType }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const canAddExpense = useMemo(() => greaterOrEqualPermission(userPermission, PermissionType.Control), [userPermission]);

  return (
    <>
      <H1>Expenses</H1>

      <InfoText>
        Below is table of expense for current project. You can add new expense if you have at least '
        {toReadableString(PermissionType.Control)}' permission.
      </InfoText>

      <Box mt="1em" mb="0.7em">
        {canAddExpense ? (
          <Button onClick={onOpen}>
            Add new Expense <Icon ml="0.2em" as={GiPayMoney} />
          </Button>
        ) : null}
      </Box>

      <NewExpenseModal projectId={projectId} currencyType={currencyType} expenseTypes={expenseTypes} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ExpensesHeading;
