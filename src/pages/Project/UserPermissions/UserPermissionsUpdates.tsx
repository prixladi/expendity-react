import React from 'react';
import { PermissionType, ProjectPermissionType, useUpdateProjectPermissionMutation } from '../../../graphql';
import { Flex, HStack, useBreakpointValue, VStack } from '@chakra-ui/react';
import PermissionRadioGroup from '../../../components/PermissionRadioGroup';
import { getLesserOrEqualPermissions, greaterOrEqualPermission } from '../../../utils';
import useApolloErrorHandling from '../../../hooks/useApolloErrorHandling';
import { permissionUpdatedNotification } from '../../../services/notificationService';

type Props = {
  permission: ProjectPermissionType;
  currentUserPermission: PermissionType;
  projectId: string;
  isCurrentUser: boolean;
};

const getAllowePermissions = (
  permission: ProjectPermissionType,
  currentUserPermission: PermissionType,
  isCurrentUser: boolean,
): PermissionType[] => {
  if (isCurrentUser || !greaterOrEqualPermission(currentUserPermission, permission.type)) {
    return [];
  }

  return getLesserOrEqualPermissions(currentUserPermission);
};

const UserPermissionsUpdates: React.FC<Props> = ({ permission, currentUserPermission, projectId, isCurrentUser }: Props) => {
  const [updatePermission] = useUpdateProjectPermissionMutation();
  const { handleGqlError } = useApolloErrorHandling();

  const Container = useBreakpointValue([VStack, VStack, HStack, HStack]);
  const onChange = async (val: PermissionType) => {
    const { data, errors } = await updatePermission({
      variables: { userId: permission.userId.toString(), projectId, update: { type: val } },
    });
    handleGqlError(errors);
    if (data) {
      permissionUpdatedNotification();
    }
  };

  return (
    <Flex>
      <Flex as={Container}>
        <PermissionRadioGroup
          allowedPermission={getAllowePermissions(permission, currentUserPermission, isCurrentUser)}
          defaultPermission={permission.type}
          onChange={onChange}
        />
      </Flex>
    </Flex>
  );
};

export default UserPermissionsUpdates;
