import React from 'react';
import { useExchangeRatesQuery } from '../graphql';

const Projects: React.FC = () => {
  const { data } = useExchangeRatesQuery();

  return <div>{data?.exchangeRates.entries}</div>;
};

export default Projects;
