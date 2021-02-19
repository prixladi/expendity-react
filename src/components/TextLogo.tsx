import React from 'react';
import { Text, Icon} from '@chakra-ui/react';
import { GiReceiveMoney } from 'react-icons/gi';

const TextLogo: React.FC = () => (
  <Text color="brand.500" fontWeight="700" letterSpacing="-.1rem">
     Expendity <Icon mb="0.2em" as={GiReceiveMoney} />
  </Text>
);

export default TextLogo;
