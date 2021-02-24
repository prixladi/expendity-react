import { Grid, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Textarea, Text } from '@chakra-ui/react';
import React from 'react';
import { FormikButton as Button } from '../../../components/Button';
import Form from '../../../components/Form';
import InputBase from '../../../components/InputBase';
import { CurrencyType, ExpenseTypeType, useCreateExpenseMutation } from '../../../graphql';
import useApolloErrorHandling from '../../../hooks/useApolloErrorHandling';
import { expenseCreatedNotification } from '../../../services/notificationService';
import * as yup from 'yup';
import { GiPayMoney } from 'react-icons/gi';
import ExpenseTypeSelect from '../../../components/ExpenseTypeSelect';
import { expenseOnCreateUpdate } from '../../../services/mutationService';

type Values = {
  name: string;
  description?: string | null;
  value: number;
  typeId?: number | null;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
  expenseTypes: ExpenseTypeType[];
  currencyType: CurrencyType;
};

const initialValues: Values = {
  name: '',
  description: '',
  value: 0,
};

const schema = yup.object().shape({
  name: yup.string().max(50, `Name is too long. It must be at most 50 characters long.`),
  description: yup.string().max(200, `Description is too long. It must be a most 200 characters long.`),
  value: yup.number().moreThan(0, 'Amount must be greater than 0.'),
});

const NewExpenseModal: React.FC<Props> = ({ isOpen, onClose, projectId, expenseTypes, currencyType }: Props) => {
  const [createExpense] = useCreateExpenseMutation();
  const { handleGqlError } = useApolloErrorHandling();

  const onSubmit = async (values: Values) => {
    const { data, errors } = await createExpense({
      variables: { expense: { ...values, projectId } },
      update: expenseOnCreateUpdate,
    });
    handleGqlError(errors);

    if (data) {
      onClose();
      expenseCreatedNotification();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as="h2">Create new Expense</ModalHeader>
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
              <ExpenseTypeSelect name="typeId" expenseTypes={expenseTypes} isRequired />
              <Button submit>
                Create
                <Icon ml="0.2em" as={GiPayMoney} />
              </Button>
            </Grid>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewExpenseModal;
