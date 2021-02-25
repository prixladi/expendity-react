import React, { InputHTMLAttributes } from 'react';
import { Input, FormControl, FormErrorMessage, InputProps, FormLabel } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';

type Props = InputProps &
  InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    isRequired?: boolean;
  };

const DatePickerInput: React.FC<Props> = ({ isRequired, label, ...props }: Props) => {
  const [field, { error }] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <DatePicker
        {...field}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        customInput={<Input width="100%" {...field} value={field.value} autoComplete="off" type="text" />}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default DatePickerInput;
