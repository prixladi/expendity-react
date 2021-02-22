import { useBreakpointValue } from '@chakra-ui/react';

const useTableSize = (): string | undefined => {
  return useBreakpointValue(['sm', 'md', 'md', 'lg']);
};

export default useTableSize;
