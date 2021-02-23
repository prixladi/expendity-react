import React, { InputHTMLAttributes } from 'react';
import { InputProps } from '@chakra-ui/react';
import InputBase from './InputBase';

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

const PasswordInput: React.FC<Props> = (props: Props) => (
  <InputBase
    label="Password"
    autoComplete="current-password"
    name="password"
    placeholder="********"
    isRequired={true}
    type="password"
    {...props}
  />
);

export default PasswordInput;
