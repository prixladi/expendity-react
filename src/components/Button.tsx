import React, { ButtonHTMLAttributes } from 'react';
import { Button, ButtonOptions, Flex, LayoutProps } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

type Props = ButtonOptions &
  LayoutProps &
  ButtonHTMLAttributes<unknown> & {
    submit?: boolean;
    children: React.ReactNode;
  };

const FormikButton: React.FC<Props> = ({ children, submit, isLoading, ...rest }: Props) => {
  const context = useFormikContext();

  return (
    <Flex justifyContent="center">
      <Button
        minW="8em"
        fontSize="1.3em"
        type={submit ? 'submit' : undefined}
        isLoading={isLoading || context?.isSubmitting}
        colorScheme="brand"
        {...rest}
      >
        {children}
      </Button>
    </Flex>
  );
};

const SubmitButton: React.FC<Props> = ({ children, submit, isLoading, ...rest }: Props) => (
  <Flex justifyContent="center">
    <Button minW="8em" fontSize="1.3em" type={submit ? 'submit' : undefined} isLoading={isLoading} colorScheme="brand" {...rest}>
      {children}
    </Button>
  </Flex>
);

export { SubmitButton as Button, FormikButton };
