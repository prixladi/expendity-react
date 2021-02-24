import { Grid, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { FormikButton as Button } from '../../components/Button';
import CurrencySelect from '../../components/CurrencySelect';
import Form from '../../components/Form';
import InputBase from '../../components/InputBase';
import { CurrencyType, useCreateProjectMutation } from '../../graphql';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import { projectOnCreateUpdate } from '../../services/mutationService';
import { projectCreatedNotification } from '../../services/notificationService';
import * as yup from 'yup';

type Values = {
  name: string;
  description?: string | null;
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

const schema = yup.object().shape({
  name: yup.string().max(50, `Name is too long. It must be at most 50 characters long.`),
  description: yup.string().max(200, `Description is too long. It must be at most 200 characters long.`),
});

const NewProjectModal: React.FC<Props> = ({ isOpen, onClose }: Props) => {
  const [createProject] = useCreateProjectMutation();
  const { handleGqlError } = useApolloErrorHandling();

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
          <Form<Values> validationSchema={schema} initialValues={initialValues} onSubmit={onSubmit}>
            <Grid gridGap="1em">
              <InputBase label="Name" name="name" placeholder="Name" type="text" isRequired />
              <InputBase as={Textarea} label="Description" name="description" placeholder="Description" type="text" />
              <CurrencySelect name="currencyType" isRequired />
              <Button submit>
                Create
                <Icon ml="0.2em" as={AiOutlineFundProjectionScreen} />{' '}
              </Button>
            </Grid>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewProjectModal;
