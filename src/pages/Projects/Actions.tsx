import React from 'react';
import { PermissionType, ProjectType } from '../../graphql';
import { useBreakpointValue, Flex, VStack } from '@chakra-ui/react';
import DeleteAction from './DeleteAction';
import UpdateAction from './UpdateAction';

type Props = {
  project: ProjectType;
};

const Actions: React.FC<Props> = ({ project }: Props) => {
  const display = useBreakpointValue([VStack, Flex, Flex, Flex]);

  if (project.userPermission !== PermissionType.Own) {
    return <p />;
  }

  return (
    <>
      <Flex gridGap="0.25em" as={display}>
        <UpdateAction project={project} />
        <DeleteAction projectId={project.id} />
      </Flex>
    </>
  );
};

export default Actions;
