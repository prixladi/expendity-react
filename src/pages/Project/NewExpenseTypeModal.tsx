import { Grid, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import { FormikButton as Button } from '../../components/Button';
import Form from '../../components/Form';
import InputBase from '../../components/InputBase';
import { useCreateExpenseTypeMutation } from '../../graphql';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import { expenseTypeOnCreateUpdate } from '../../services/mutationService';
import { expenseTypeCreatedNotification } from '../../services/notificationService';
import * as yup from 'yup';
import { GiMoneyStack } from 'react-icons/gi';

type Values = {
  name: string;
  description?: string | null;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
};

const initialValues: Values = {
  name: '',
  description: '',
};

const schema = yup.object().shape({
  name: yup.string().max(50, `Name is too long. It must be at most 50 characters long.`),
  description: yup.string().max(200, `Description is too long. It must be a most 200 characters long.`),
});

const NewExpenseTypeModal: React.FC<Props> = ({ isOpen, onClose, projectId }: Props) => {
  const [createExpenseType, { error }] = useCreateExpenseTypeMutation({ errorPolicy: 'all' });
  const { handleGqlError } = useApolloErrorHandling(error);

  const onSubmit = async (values: Values) => {
    const { data, errors } = await createExpenseType({
      variables: { expenseType: { ...values, projectId } },
      update: expenseTypeOnCreateUpdate,
    });
    handleGqlError(errors);

    if (data) {
      onClose();
      expenseTypeCreatedNotification();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as="h2">Create new Expense Type</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form<Values> validationSchema={schema} initialValues={initialValues} onSubmit={onSubmit}>
            <Grid gridGap="1em">
              <InputBase name="name" placeholder="Name" type="text" isRequired />
              <InputBase name="description" placeholder="Description" type="text" />
              <Button submit>
                Create
                <Icon ml="0.2em" as={GiMoneyStack} />
              </Button>
            </Grid>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewExpenseTypeModal;
