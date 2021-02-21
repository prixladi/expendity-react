import { Heading } from '@chakra-ui/react';
import React from 'react';

const H1: React.FC = ({ children }) => (
  <Heading as="h1" mb="0.5em">
    {children}
  </Heading>
);

export default H1;
