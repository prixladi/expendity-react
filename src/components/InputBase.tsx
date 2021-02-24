import React, { InputHTMLAttributes } from 'react';
import { Input, FormControl, FormErrorMessage, InputProps, FormLabel, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useField } from 'formik';

type Props = InputProps &
  InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    type: string;
    placeholder: string;
    label: string;
    isRequired?: boolean;
    rightElement?: React.ReactNode;
  };

const InputBase: React.FC<Props> = ({ type, placeholder, isRequired, label, rightElement, ...props }: Props) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <Input {...field} placeholder={placeholder} type={type} {...props} />
        {rightElement && <InputRightElement>{rightElement}</InputRightElement>}
      </InputGroup>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputBase;
