import React from 'react';
import { Text, Icon } from '@chakra-ui/react';
import { GiReceiveMoney } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { HomeRoute } from '../routes';

const TextLogo: React.FC = () => (
  <Link to={HomeRoute}>
    <Text color="brand.500" fontWeight="700" letterSpacing="-.1rem">
      Expendity <Icon mb="0.2em" as={GiReceiveMoney} />
    </Text>
  </Link>
);

export default TextLogo;
