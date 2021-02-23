import React from 'react';
import { ProjectInviteType } from '../../../graphql';
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { toReadableString } from '../../../utils';

type Props = {
  projectInvite: ProjectInviteType;
  inviteUrl: string;
};

const InviteDetailModal: React.FC<Props> = ({ projectInvite, inviteUrl }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box _hover={{ textDecor: 'underline' }} cursor="pointer" onClick={onOpen} as="span">
        {inviteUrl}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as="h2">{inviteUrl}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{projectInvite.isMultiUse ? 'Is for multiple uses ' : 'Is for single use '}</Text>
            <Text>{`${toReadableString(projectInvite.projectPermissionType)} Permission`}</Text>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default InviteDetailModal;
