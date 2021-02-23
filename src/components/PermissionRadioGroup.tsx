import { Box, useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/react';
import React from 'react';
import { PermissionType } from '../graphql';
import { toReadableString } from '../utils';

type Props = {
  allowedPermission: PermissionType[];
  defaultPermission: PermissionType;
  onChange: (value: PermissionType) => void;
};

type CardProps = UseRadioProps & {
  permission: PermissionType;
};

const permissions = [PermissionType.View, PermissionType.Control, PermissionType.Configure, PermissionType.Own];

const RadioCard: React.FC<CardProps> = ({ permission, isDisabled, ...props }: CardProps) => {
  const { getInputProps, getCheckboxProps } = useRadio({ ...props, isDisabled });

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="0.1rem"
        borderRadius="md"
        _checked={{
          bg: 'brand.500',
          borderColor: 'brand.500',
        }}
        _disabled={{
          opacity: '0.5',
          textDecor: 'line-through'
        }}
        px={5}
        py={3}
      >
        {toReadableString(permission)}
      </Box>
    </Box>
  );
};

const PermissionRadioGroup: React.FC<Props> = ({ allowedPermission, defaultPermission, onChange }: Props) => {
  const { getRadioProps } = useRadioGroup({
    name: 'permission',
    defaultValue: defaultPermission,
    onChange: (val) => onChange(val as PermissionType),
  });

  return (
    <>
      {permissions.map((value) => {
        const radio = getRadioProps({ value, enterKeyHint: false });
        return (
          <RadioCard
            {...radio}
            key={value}
            permission={value}
            isDisabled={value !== defaultPermission && !allowedPermission.includes(value)}
          />
        );
      })}
    </>
  );
};

export default PermissionRadioGroup;
