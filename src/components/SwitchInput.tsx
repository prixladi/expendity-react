import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Switch, Flex } from '@chakra-ui/react';
import { useField } from 'formik';
import { SwitchProps } from 'react-router-dom';

type Props = SwitchProps & {
  name: string;
  label: string;
  isRequired?: boolean;
};

const SwitchInput: React.FC<Props> = ({ isRequired, label, ...props }: Props) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isRequired={isRequired}>
      <Flex as="span">
        <FormLabel>{label}</FormLabel>
        <Switch {...field} />
      </Flex>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default SwitchInput;
