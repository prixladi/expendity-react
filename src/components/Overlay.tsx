import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

const Overlay: React.FC = ({ children }) => (
  <Box position="relative" minH="100vh">
    <Container pb={['4em', '5em', '6em', '6em']} maxW="100%">
      <NavBar />
      <Box pt={['0.5em', '2em', '3em', '3.5em']}>{children}</Box>
    </Container>

    <Box position="absolute" w="100%" h={['3em', '3em', '4em', '4em']} bottom="0">
      <Footer />
    </Box>
  </Box>
);

export default Overlay;
