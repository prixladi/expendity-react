import React, { InputHTMLAttributes } from 'react';
import { Input, FormControl, FormErrorMessage, InputProps, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';

type Props = InputProps &
  InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    type: string;
    placeholder: string;
    label: string;
    isRequired?: boolean;
  };

const InputBase: React.FC<Props> = ({ type, placeholder, isRequired, label, ...props }: Props) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input {...field} placeholder={placeholder} type={type} {...props} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputBase;
