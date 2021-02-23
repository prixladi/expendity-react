import React from 'react';
import { ProjectPermissionType, useDeleteProjectPermissionMutation } from '../../../graphql';
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
import { projectDeletedNotification } from '../../../services/notificationService';
import { projectPermissionOnDeleteUpdate } from '../../../services/mutationService';

type Props = {
  permission: ProjectPermissionType;
  projectId: string;
};

const DeleteUserPermissionAction: React.FC<Props> = ({ permission, projectId }: Props) => {
  const [deleteExpenseType] = useDeleteProjectPermissionMutation({ errorPolicy: 'all' });
  const { handleGqlError } = useApolloErrorHandling();
  const { isOpen, onClose, onOpen } = useDisclosure();
  // eslint-disable-next-line
  const cancelRef = React.useRef(null as any | null);

  const onDelete = async () => {
    const { data, errors } = await deleteExpenseType({
      variables: { userId: permission.userId.toString(), projectId },
      update: projectPermissionOnDeleteUpdate,
    });
    
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
              Delete User '{permission.userEmail}' from project
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

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

export default DeleteUserPermissionAction;
