import { Box, Table, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

const TableWrapper: React.FC = ({ children }) => {
  const tableSize = useBreakpointValue(['sm', 'md', 'md', 'lg']);
  const overflow = useBreakpointValue(['scroll', 'scroll', 'hidden', 'hidden']) as 'scroll' | undefined;

  return (
    <Box overflowX={overflow}>
      <Table textOverflow="ellipsis" size={tableSize} variant="striped">
        {children}
      </Table>
    </Box>
  );
};

export default TableWrapper;
