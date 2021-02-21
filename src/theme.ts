import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: "'Menlo', monospace" };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '70em',
  xl: '80em',
});

const getBrandColors = () => {
  // ORANGE
  //  200: "#DD6B20",
  //  500: "#DD6B20",

  // TEAL
  // 200: '#4FD1C5',
  // 500: '#319795',

  // TEAL
  // 200: '#38A169',
  // 500: '#38A169',

  return {
    100: '#eab676',
    200: '#DD6B20',
    500: '#DD6B20',
  };
};

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  colors: {
    brand: getBrandColors(),
  },
  fonts,
  breakpoints,
});

export default theme;
