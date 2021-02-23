import React from 'react';
import { ExpenseTypeType, useUpdateExpenseTypeMutation } from '../../../graphql';
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
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import Form from '../../../components/Form';
import InputBase from '../../../components/InputBase';
import { Button } from '../../../components/Button';
import * as yup from 'yup';
import { projectUpdatedNotification } from '../../../services/notificationService';
import useApolloErrorHandling from '../../../hooks/useApolloErrorHandling';
import { expenseTypeOnUpdateUpdate } from '../../../services/mutationService';
import { GiMoneyStack } from 'react-icons/gi';

type Values = {
  name: string;
  description?: string | null;
};

type Props = {
  expenseType: ExpenseTypeType;
};

const schema = yup.object().shape({
  name: yup.string().max(50, `Name is too long. It must be a most 50 characters long.`),
  description: yup.string().max(200, `Description is too long. It must be a most 200 characters long.`),
});

const UpdateExpenseTypeAction: React.FC<Props> = ({ expenseType }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [updateExpenseType] = useUpdateExpenseTypeMutation({ errorPolicy: 'all' });
  const { handleGqlError } = useApolloErrorHandling();

  const onSubmit = async (values: Values) => {
    const { data, errors } = await updateExpenseType({
      variables: { id: expenseType.id, update: values },
      update: expenseTypeOnUpdateUpdate,
    });
    handleGqlError(errors);
    if (data) {
      onClose();
      projectUpdatedNotification();
    }
  };

  const initialValues: Values = {
    name: expenseType.name,
    description: expenseType.description,
  };

  return (
    <Tag onClick={onOpen} cursor="pointer" colorScheme="brand">
      <TagLabel>Edit</TagLabel>
      <TagRightIcon as={FaEdit} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as="h2">Update Expense Type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form<Values> validationSchema={schema} initialValues={initialValues} onSubmit={onSubmit}>
              <Grid gridGap="1em">
                <InputBase label="Name" name="name" placeholder="Name" type="text" isRequired />
                <InputBase as={Textarea} label="Description" name="description" placeholder="Description" type="text" />
                <Button submit>
                  Update
                  <Icon ml="0.2em" as={GiMoneyStack} />
                </Button>
              </Grid>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Tag>
  );
};

export default UpdateExpenseTypeAction;
