import React from 'react';
import { Divider, Link, Text } from '@chakra-ui/react';

const Footer: React.FC = () => (
  <>
    <Divider mb="0.5em" />
    <Text textAlign="center" fontSize={['1.em', '1.1em', '1.1em', '1.2em']} fontWeight="300">
      Copyright {new Date().getFullYear()} ©{' '}
      <Link isExternal={true} href="http://ladislavprix.cz">
        Ladislav Prix
      </Link>
    </Text>
  </>
);

export default Footer;
