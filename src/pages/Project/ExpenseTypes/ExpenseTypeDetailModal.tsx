import React from 'react';
import { ExpenseTypeType } from '../../../graphql';
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
} from '@chakra-ui/react';
import Text from '../../../components/Text';

type Props = {
  expenseType: ExpenseTypeType;
};
const ExpenseTypeDetailModal: React.FC<Props> = ({ expenseType }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box _hover={{ textDecor: 'underline' }} cursor="pointer" onClick={onOpen} as="span">
        {expenseType.name}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as="h2">{expenseType.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{expenseType.description}</Text>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExpenseTypeDetailModal;
