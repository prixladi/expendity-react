import React, { ButtonHTMLAttributes } from 'react';
import { Button, ButtonOptions, Flex, LayoutProps } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

type Props = ButtonOptions &
  LayoutProps &
  ButtonHTMLAttributes<unknown> & {
    submit?: boolean;
    children: React.ReactNode;
  };

const SubmitButton: React.FC<Props> = ({ children, submit, isLoading, ...rest }: Props) => {
  const { isSubmitting } = useFormikContext();

  return (
    <Flex justifyContent="center">
      <Button
        minW="8em"
        fontSize="1.3em"
        type={submit ? 'submit' : undefined}
        isLoading={isLoading || isSubmitting}
        colorScheme="brand"
        {...rest}
      >
        {children}
      </Button>
    </Flex>
  );
};

export default SubmitButton;
