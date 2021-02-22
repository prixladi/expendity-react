import React from 'react';
import { ColorProps, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

type Props = ColorProps & {
  href: string;
  children: React.ReactNode;
};

const InternalLink: React.FC<Props> = ({ href, children, ...rest }: Props) => (
  <Link as={RouterLink} to={href} color="red.500" {...rest}>
    {children}
  </Link>
);

export default InternalLink;
