import React from 'react';
import { useBreakpointValue, Flex, VStack } from '@chakra-ui/react';
import CopyUrlAction from './CopyUrlAction';
import DeleteInviteAction from './DeleteInviteAction';

type Props = {
  inviteId: string;
  inviteUrl: string;
};

const InviteActions: React.FC<Props> = ({ inviteId, inviteUrl }: Props) => {
  const display = useBreakpointValue([VStack, Flex, Flex, Flex]);

  return (
    <>
      <Flex>
        <Flex gridGap="0.25em" as={display}>
          <CopyUrlAction inviteUrl={inviteUrl} />
          <DeleteInviteAction inviteId={inviteId} />
        </Flex>
      </Flex>
    </>
  );
};

export default InviteActions;
