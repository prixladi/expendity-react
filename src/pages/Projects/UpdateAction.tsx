import React from 'react';
import { ProjectType, useUpdateProjectMutation } from '../../graphql';
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
import Form from '../../components/Form';
import InputBase from '../../components/InputBase';
import { Button } from '../../components/Button';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import * as yup from 'yup';
import { projectUpdatedNotification } from '../../services/notificationService';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import { projectOnUpdateUpdate } from '../../services/mutationService';

type Values = {
  name: string;
  description?: string | null;
};

type Props = {
  project: ProjectType;
};

const schema = yup.object().shape({
  name: yup.string().max(50, `Name is too long. It must be a most 50 characters long.`),
  description: yup.string().max(200, `Description is too long. It must be a most 200 characters long.`),
});

const UpdateAction: React.FC<Props> = ({ project }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [updateProject] = useUpdateProjectMutation({ errorPolicy: 'all' });
  const { handleGqlError } = useApolloErrorHandling();

  const onSubmit = async (values: Values) => {
    const { data, errors } = await updateProject({ variables: { id: project.id, update: values }, update: projectOnUpdateUpdate });
    handleGqlError(errors);
    if (data) {
      onClose();
      projectUpdatedNotification();
    }
  };

  const initialValues: Values = {
    name: project.name,
    description: project.description,
  };

  return (
    <Tag onClick={onOpen} cursor="pointer" colorScheme="brand">
      <TagLabel>Edit</TagLabel>
      <TagRightIcon as={FaEdit} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as="h2">Update Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form<Values> validationSchema={schema} initialValues={initialValues} onSubmit={onSubmit}>
              <Grid gridGap="1em">
                <InputBase label="Name" name="name" placeholder="Name" type="text" isRequired />
                <InputBase as={Textarea} label="Description" name="description" placeholder="Description" type="text" />
                <Button submit>
                  Update
                  <Icon ml="0.2em" as={AiOutlineFundProjectionScreen} />{' '}
                </Button>
              </Grid>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Tag>
  );
};

export default UpdateAction;
