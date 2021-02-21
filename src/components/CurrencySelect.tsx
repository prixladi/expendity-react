import React, { InputHTMLAttributes } from 'react';
import { FormControl, FormErrorMessage, InputProps, Select } from '@chakra-ui/react';
import { useField } from 'formik';
import { CurrencyType } from '../graphql';

type Props = InputProps &
  InputHTMLAttributes<HTMLSelectElement> & {
    name: string;
    isRequired: boolean;
  };

const CurrencySelect: React.FC<Props> = ({ placeholder, isRequired, ...props }: Props) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <Select {...field} placeholder={placeholder} {...props}>
        <option value={CurrencyType.Czk}>{CurrencyType.Czk}</option>
        <option value={CurrencyType.Usd}>{CurrencyType.Usd}</option>
        <option value={CurrencyType.Eur}>{CurrencyType.Eur}</option>
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default CurrencySelect;
