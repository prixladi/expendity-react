import { Grid, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import { FormikButton as Button } from '../../../components/Button';
import Form from '../../../components/Form';
import { PermissionType, useCreateProjectInviteMutation } from '../../../graphql';
import useApolloErrorHandling from '../../../hooks/useApolloErrorHandling';
import { projectInviteOnCreateUpdate } from '../../../services/mutationService';
import { inviteCreatedNotification } from '../../../services/notificationService';
import PermissionSelect from '../../../components/PermissionSelect';
import SwitchInput from '../../../components/SwitchInput';
import { TiTicket } from 'react-icons/ti';

type Values = {
  isMultiUse: boolean;
  projectPermissionType: PermissionType;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
};

const initialValues: Values = {
  isMultiUse: false,
  projectPermissionType: PermissionType.Control,
};

const NewInviteModal: React.FC<Props> = ({ isOpen, onClose, projectId }: Props) => {
  const [createExpenseType] = useCreateProjectInviteMutation({ errorPolicy: 'all' });
  const { handleGqlError } = useApolloErrorHandling();

  const onSubmit = async (values: Values) => {
    const { data, errors } = await createExpenseType({
      variables: { projectInvite: { ...values, projectId: projectId } },
      update: projectInviteOnCreateUpdate,
    });
    handleGqlError(errors);

    if (data) {
      onClose();
      inviteCreatedNotification();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as="h2">Create new Project Invite</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form<Values> initialValues={initialValues} onSubmit={onSubmit}>
            <Grid gridGap="1em">
              <PermissionSelect name="projectPermissionType" isRequired />
              <SwitchInput name="isMultiUse" label="Is for multiple uses" />
              <Button submit>
                Create
                <Icon ml="0.2em" as={TiTicket} />
              </Button>
            </Grid>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewInviteModal;
