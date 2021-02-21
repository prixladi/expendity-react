import { Grid, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { FormikButton as Button } from '../components/Button';
import CurrencySelect from '../components/CurrencySelect';
import Form from '../components/Form';
import InputBase from '../components/InputBase';
import { CurrencyType, useCreateProjectMutation } from '../graphql';
import useApolloErrorHandling from '../hooks/useApolloErrorHandling';
import { projectOnCreateUpdate } from '../services/mutationService';
import { projectCreatedNotification } from '../services/notificationService';

type Values = {
  name: string;
  description: string;
  currencyType: CurrencyType;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const initialValues: Values = {
  name: '',
  description: '',
  currencyType: CurrencyType.Czk,
};

const NewProjectModal: React.FC<Props> = ({ isOpen, onClose }: Props) => {
  const [createProject, { error }] = useCreateProjectMutation();
  const { handleGqlError } = useApolloErrorHandling(error);

  const onSubmit = async (values: Values) => {
    const { data, errors } = await createProject({ variables: { project: values }, update: projectOnCreateUpdate });
    handleGqlError(errors);
    if (data) {
      onClose();
      projectCreatedNotification();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as="h2">Create new Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form<Values> initialValues={initialValues} onSubmit={onSubmit}>
            <Grid gridGap="1em">
              <InputBase name="name" placeholder="Name of the Project" type="text" isRequired />
              <InputBase name="description" placeholder="Description" type="text" isRequired />
              <CurrencySelect name="currencyType" isRequired />
              <Button submit>
                Create
                <Icon ml="0.2em" as={AiOutlineFundProjectionScreen} />{' '}
              </Button>
            </Grid>
          </Form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewProjectModal;
