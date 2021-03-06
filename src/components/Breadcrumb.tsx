import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  translations?: Record<string, string>;
};

const Bread: React.FC<Props> = ({ translations }: Props) => {
  const loacation = useLocation();

  const data = useMemo(() => {
    let current = '/';
    const parts = loacation.pathname.split('/').filter((x) => !!x);

    return parts
      .map((x) => x.replace('/', ''))
      .map((x) => {
        current = `${current}${x}/`;

        let finalResult: string;

        if (translations && translations[x]) {
          finalResult = translations[x];
        } else {
          const result = x.replace(/([A-Z])/g, ' $1');
          finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        }

        return { path: current, part: finalResult };
      });
  }, [loacation, translations]);

  return (
    <Flex justifyContent="flex-start">
      <Breadcrumb mb="0.5em" separator={<ChevronRightIcon color="brand.500" />} opacity="0.7">
        {data.map((x) => (
          <BreadcrumbItem key={x.path}>
            <BreadcrumbLink color="brand.500" fontSize="1.1em" as={Link} to={x.path}>
              {x.part}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Flex>
  );
};

export default Bread;
