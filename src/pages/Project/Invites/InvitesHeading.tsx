import React, { useMemo } from 'react';
import { useDisclosure, Box, Icon } from '@chakra-ui/react';
import InfoText from '../../../components/Text';
import { Button } from '../../../components/Button';
import H1 from '../../../components/H1';
import { PermissionType } from '../../../graphql';
import { greaterOrEqualPermission } from '../../../utils';
import NewInviteModal from './NewInviteModal';
import { TiTicket } from 'react-icons/ti';

type Props = {
  userPermission: PermissionType;
  projectId: number;
};

const InvitesHeading: React.FC<Props> = ({ userPermission, projectId }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const isProjectAdmin = useMemo(() => greaterOrEqualPermission(userPermission, PermissionType.Configure), [userPermission]);

  return (
    <>
      <H1>Project Invites</H1>

      <InfoText>
        Below is table of invites for current project. User joining project will get permission associated with with invite.
      </InfoText>

      <Box mt="1em" mb="0.7em">
        {isProjectAdmin ? (
          <Button onClick={onOpen}>
            Add new Invite <Icon ml="0.2em" as={TiTicket} />
          </Button>
        ) : null}
      </Box>

      <NewInviteModal projectId={projectId} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default InvitesHeading;
