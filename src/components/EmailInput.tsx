import React, { InputHTMLAttributes } from 'react';
import { InputProps } from '@chakra-ui/react';
import InputBase from './InputBase';

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

const EmailInput: React.FC<Props> = (props: Props) => (
  <InputBase name="email" placeholder="Email" isRequired={true} type="email" {...props} />
);

export default EmailInput;
