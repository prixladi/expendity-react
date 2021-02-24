import React from 'react';
import { useDeleteProjectInviteMutation } from '../../../graphql';
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
import { projectInviteOnDeleteUpdate } from '../../../services/mutationService';
import { inviteDeletedNotification } from '../../../services/notificationService';

type Props = {
  inviteId: string;
};

const DeleteInviteAction: React.FC<Props> = ({ inviteId }: Props) => {
  const [deleteInvite] = useDeleteProjectInviteMutation();
  const { handleGqlError } = useApolloErrorHandling();
  const { isOpen, onClose, onOpen } = useDisclosure();
  // eslint-disable-next-line
  const cancelRef = React.useRef(null as any | null);

  const onDelete = async () => {
    try {
      const { data, errors } = await deleteInvite({ variables: { id: inviteId }, update: projectInviteOnDeleteUpdate });
      handleGqlError(errors);
      if (data) {
        inviteDeletedNotification();
        onClose();
      }
    } catch (err) {
      console.error(err);
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
              Delete Invite
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards. All expenses under this type will be unasigned.
            </AlertDialogBody>

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

export default DeleteInviteAction;
