import React from 'react';
import { Grid } from '@chakra-ui/react';
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { WideContent } from './Content';

const DefaultSkelleton: React.FC = () => {
  return (
    <WideContent>
      <Grid gridGap="1em">
        <SkeletonCircle size="4em" />
        <SkeletonText noOfLines={12} spacing="0.7em" />
      </Grid>
    </WideContent>
  );
};

export default DefaultSkelleton;
