import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import NavBar from './NavBar';

const Overlay: React.FC = ({ children }) => (
  <Container maxW="100%">
    <NavBar />
    <Box pt={['0.5em', '2em', '3em', '3.5em']}>{children}</Box>
  </Container>
);

export default Overlay;
