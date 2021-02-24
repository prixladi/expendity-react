import { Heading } from '@chakra-ui/react';
import React from 'react';

const H2: React.FC = ({ children }) => (
  <Heading fontSize="1.7em" as="h2" mb="0.3em">
    {children}
  </Heading>
);

export default H2;
