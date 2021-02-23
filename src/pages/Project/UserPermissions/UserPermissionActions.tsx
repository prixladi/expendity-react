import React, { useMemo } from 'react';
import { PermissionType, ProjectPermissionType } from '../../../graphql';
import { Flex } from '@chakra-ui/react';
import DeleteUserPermissionAction from './DeleteUserPermissionAction';
import { greaterOrEqualPermission } from '../../../utils';

type Props = {
  permission: ProjectPermissionType;
  currentUserPermission: PermissionType;
  projectId: string;
  isCurrentUser: boolean;
};

const UserPermissionActions: React.FC<Props> = ({ permission, currentUserPermission, projectId, isCurrentUser }: Props) => {
  const canDelete = useMemo(() => {
    return (
      !isCurrentUser &&
      greaterOrEqualPermission(currentUserPermission, permission.type) &&
      greaterOrEqualPermission(currentUserPermission, PermissionType.Configure)
    );
  }, [permission, currentUserPermission, isCurrentUser]);

  if (!canDelete) {
    return <p />;
  }

  return (
    <>
      <Flex>
        <Flex gridGap="0.25em">
          <DeleteUserPermissionAction permission={permission} projectId={projectId} />
        </Flex>
      </Flex>
    </>
  );
};

export default UserPermissionActions;
