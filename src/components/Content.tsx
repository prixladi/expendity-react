import React from 'react';
import { Container } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

const WideContent: React.FC<Props> = ({ children }: Props) => (
  <Container p="0" maxW={['30em', '40em', '50em', '60em']}>
    {children}
  </Container>
);

const NarrowContent: React.FC<Props> = ({ children }: Props) => (
  <Container p="0" maxW={['30em', '30em', '30em', '30em']}>
    {children}
  </Container>
);

export { WideContent, NarrowContent };
