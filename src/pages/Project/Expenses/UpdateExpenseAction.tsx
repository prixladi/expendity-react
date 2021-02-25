import React from 'react';
import { CurrencyType, ExpenseType, ExpenseTypeType, useUpdateExpenseMutation } from '../../../graphql';
import {
  Grid,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  TagRightIcon,
  Textarea,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import Form from '../../../components/Form';
import InputBase from '../../../components/InputBase';
import { FormikButton as Button } from '../../../components/Button';
import * as yup from 'yup';
import { projectUpdatedNotification } from '../../../services/notificationService';
import useApolloErrorHandling from '../../../hooks/useApolloErrorHandling';
import { GiPayMoney } from 'react-icons/gi';
import ExpenseTypeSelect from '../../../components/ExpenseTypeSelect';
import DatePickerInput from '../../../components/DatePickerInput';

type Values = {
  name: string;
  description?: string | null;
  value: number;
  typeId?: number | null;
  dateAdded: string;
};

type Props = {
  expense: ExpenseType;
  expenseTypes: ExpenseTypeType[];
  currencyType: CurrencyType;
};

const schema = yup.object().shape({
  name: yup.string().max(50, `Name is too long. It must be at most 50 characters long.`),
  description: yup.string().max(200, `Description is too long. It must be a most 200 characters long.`).nullable(),
  value: yup.number().moreThan(0, 'Amount must be greater than 0.'),
});

const UpdateExpenseAction: React.FC<Props> = ({ expense, expenseTypes, currencyType }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [updateExpense] = useUpdateExpenseMutation();
  const { handleGqlError } = useApolloErrorHandling();

  const onSubmit = async (values: Values) => {
    const { data, errors } = await updateExpense({
      variables: { id: expense.id, update: { ...values, typeId: values.typeId ? values.typeId : null } },
    });
    handleGqlError(errors);

    if (data) {
      onClose();
      projectUpdatedNotification();
    }
  };

  const initialValues: Values = {
    name: expense.name,
    description: expense.description ?? undefined,
    value: expense.value,
    typeId: expense.typeId,
    dateAdded: new Date(expense.dateAdded).toLocaleDateString(),
  };

  return (
    <Tag onClick={onOpen} cursor="pointer" colorScheme="brand">
      <TagLabel>Edit</TagLabel>
      <TagRightIcon as={FaEdit} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as="h2">Update Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form<Values> validationSchema={schema} initialValues={initialValues} onSubmit={onSubmit}>
              <Grid gridGap="1em">
                <InputBase label="Name" name="name" placeholder="Name" type="text" isRequired />
                <InputBase label="Description" name="description" placeholder="Description" type="text" as={Textarea} />
                <InputBase
                  label="Amount"
                  name="value"
                  placeholder="Amount"
                  type="number"
                  isRequired
                  rightElement={<Text pr="0.3em">{currencyType}</Text>}
                />
                <ExpenseTypeSelect name="typeId" expenseTypes={expenseTypes} />
                <DatePickerInput label="Date" name="dateAdded" isRequired />
                <Button submit>
                  Update
                  <Icon ml="0.2em" as={GiPayMoney} />
                </Button>
              </Grid>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Tag>
  );
};

export default UpdateExpenseAction;
