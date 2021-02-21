import React from 'react';
import { useDeleteProjectMutation } from '../../graphql';
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
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import { projectOnDeleteUpdate } from '../../services/mutationService';
import { projectDeletedNotification } from '../../services/notificationService';

type Props = {
  projectId: string;
};

const DeleteAction: React.FC<Props> = ({ projectId }: Props) => {
  const [deleteProject, { error }] = useDeleteProjectMutation({ errorPolicy: 'all' });
  const { handleGqlError } = useApolloErrorHandling(error);
  const { isOpen, onClose, onOpen } = useDisclosure();
  // eslint-disable-next-line
  const cancelRef = React.useRef(null as any | null);

  const onDelete = async () => {
    const { data, errors } = await deleteProject({ variables: { id: projectId }, update: projectOnDeleteUpdate });
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
              Delete Project
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

export default DeleteAction;
