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

const PermissionSelect: React.FC<Props> = ({ placeholder, isRequired, includeOwn, ...props }: Props) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel>Currency Type</FormLabel>
      <Select {...field} placeholder={placeholder} {...props}>
        <option value={toReadableString(PermissionType.View)}>{PermissionType.View}</option>
        <option value={PermissionType.Control}>{PermissionType.Control}</option>
         <option value={PermissionType.Configure}>{PermissionType.Configure}</option>
        {includeOwn && <option value={PermissionType.Own}>{PermissionType.Own}</option>}
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default PermissionSelect;
