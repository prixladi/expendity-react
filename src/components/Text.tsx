import React from 'react';
import * as CSS from 'csstype';
import { ColorProps, LayoutProps, ResponsiveValue, SpaceProps, Text as ChakraText } from '@chakra-ui/react';

type Props = SpaceProps &
  LayoutProps &
  ColorProps & {
    children: React.ReactNode;
    fontSize?: ResponsiveValue<CSS.Property.FontSize<string>>;
    textAlign?: ResponsiveValue<CSS.Property.TextAlign>;
  };

const Text: React.FC<Props> = ({ children, fontSize, textAlign, ...props }: Props) => (
  <ChakraText textAlign={textAlign || 'justify'} fontSize={fontSize ?? ['1.3em', '1.4em', '1.4em', '1.5em']} fontWeight="300" {...props}>
    {children}
  </ChakraText>
);

export default Text;
