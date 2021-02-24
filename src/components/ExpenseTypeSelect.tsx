import React, { InputHTMLAttributes } from 'react';
import { FormControl, FormErrorMessage, FormLabel, InputProps, Select } from '@chakra-ui/react';
import { useField } from 'formik';
import { ExpenseTypeType } from '../graphql';

type Props = InputProps &
  InputHTMLAttributes<HTMLSelectElement> & {
    expenseTypes: ExpenseTypeType[];
    name: string;
    isRequired: boolean;
  };

const ExpenseTypeSelect: React.FC<Props> = ({ isRequired, expenseTypes, ...props }: Props) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel>Expense Type</FormLabel>
      <Select defaultValue={undefined} {...field} {...props}>
        <option value={undefined}>Unclassified</option>
        {expenseTypes.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default ExpenseTypeSelect;
