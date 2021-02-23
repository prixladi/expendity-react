import React, { InputHTMLAttributes } from 'react';
import { FormControl, FormErrorMessage, FormLabel, InputProps, Select } from '@chakra-ui/react';
import { useField } from 'formik';
import { PermissionType } from '../graphql';
import { toReadableString } from '../utils';

type Props = InputProps &
  InputHTMLAttributes<HTMLSelectElement> & {
    name: string;
    isRequired: boolean;
    includeOwn?: boolean;
  };

const PermissionSelect: React.FC<Props> = ({ isRequired, includeOwn, ...props }: Props) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel>Permission Type</FormLabel>
      <Select {...field} {...props}>
        <option value={PermissionType.View}>{toReadableString(PermissionType.View)}</option>
        <option value={PermissionType.Control}>{toReadableString(PermissionType.Control)}</option>
        <option value={PermissionType.Configure}>{toReadableString(PermissionType.Configure)}</option>
        {includeOwn && <option value={PermissionType.Own}>{toReadableString(PermissionType.Own)}</option>}
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default PermissionSelect;
