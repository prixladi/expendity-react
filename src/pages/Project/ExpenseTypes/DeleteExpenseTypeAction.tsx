import React from 'react';
import { useDeleteExpenseTypeMutation } from '../../../graphql';
import {
  Tag,
  TagLabel,
  TagRightIcon,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import useApolloErrorHandling from '../../../hooks/useApolloErrorHandling';
import { expenseTypeOnDeleteUpdate } from '../../../services/mutationService';
import { projectDeletedNotification } from '../../../services/notificationService';

type Props = {
  expenseTypeId: string;
};

const DeleteExpenseTypeAction: React.FC<Props> = ({ expenseTypeId }: Props) => {
  const [deleteExpenseType] = useDeleteExpenseTypeMutation({ errorPolicy: 'all' });
  const { handleGqlError } = useApolloErrorHandling();
  const { isOpen, onClose, onOpen } = useDisclosure();
  // eslint-disable-next-line
  const cancelRef = React.useRef(null as any | null);

  const onDelete = async () => {
    const { data, errors } = await deleteExpenseType({ variables: { id: expenseTypeId }, update: expenseTypeOnDeleteUpdate });
    handleGqlError(errors);
    if (data) {
      projectDeletedNotification();
      onClose();
    }
  };

  return (
    <Tag onClick={onOpen} cursor="pointer" colorScheme="red">
      <TagLabel>Delete</TagLabel>
      <TagRightIcon as={FaTrashAlt} />

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Expense Type
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards. All expenses under this type will be unasigned.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Tag>
  );
};

export default DeleteExpenseTypeAction;
