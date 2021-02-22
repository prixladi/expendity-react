import { PermissionType } from './graphql';

const greaterOrEqualPermission = (p1: PermissionType, p2: PermissionType): boolean => {
  switch (p2) {
    case PermissionType.View:
      return [PermissionType.View, PermissionType.Control, PermissionType.Configure, PermissionType.Own].includes(p1);
    case PermissionType.Control:
      return [PermissionType.Control, PermissionType.Configure, PermissionType.Own].includes(p1);
    case PermissionType.Configure:
      return [PermissionType.Configure, PermissionType.Own].includes(p1);
    case PermissionType.Own:
      return [PermissionType.Own].includes(p1);
    default:
      console.error(`Permission '${p1}' is not implemented.`);
  }

  return false;
};

const greaterPermission = (p1: PermissionType, p2: PermissionType): boolean => {
  switch (p2) {
    case PermissionType.View:
      return [PermissionType.Control, PermissionType.Configure, PermissionType.Own].includes(p1);
    case PermissionType.Control:
      return [PermissionType.Configure, PermissionType.Own].includes(p1);
    case PermissionType.Configure:
      return [PermissionType.Own].includes(p1);
    case PermissionType.Own:
      return false;
    default:
      console.error(`Permission '${p1}' is not implemented.`);
  }

  return false;
};

export { greaterOrEqualPermission, greaterPermission };
