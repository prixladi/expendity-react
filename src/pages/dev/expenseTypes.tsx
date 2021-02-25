import React, { useEffect } from 'react';
import { useCreateExpenseTypeMutation } from '../../graphql';

const expenseTypes = [
  {
    id: 0,
    name: 'Food',
  },
  {
    id: 1,
    name: 'Drink',
  },
  {
    id: 2,
    name: 'Bus',
  },
  {
    id: 3,
    name: 'Trash food & drink',
  },
  {
    id: 4,
    name: 'School',
  },
  {
    id: 5,
    name: 'Lost money',
  },
  {
    id: 6,
    name: 'Counting error',
  },
  {
    id: 7,
    name: 'Clothes',
  },
  {
    id: 8,
    name: 'Rent',
  },
  {
    id: 9,
    name: 'Food in restaurant',
  },
  {
    id: 10,
    name: 'Drink in restaurant',
  },
  {
    id: 11,
    name: 'Tip in restaurant',
  },
  {
    id: 12,
    name: 'Electronics',
  },
  {
    id: 13,
    name: 'Gifts',
  },
  {
    id: 14,
    name: 'Medicare',
  },
  {
    id: 15,
    name: 'Bank fee',
  },
  {
    id: 16,
    name: 'Hosting and domain and cloud',
  },
  {
    id: 17,
    name: 'Taxes',
  },
  {
    id: 18,
    name: 'Convenience',
  },
  {
    id: 19,
    name: 'Entertainment',
  },
];

const DevOld = () => {
  const [createExpenseType] = useCreateExpenseTypeMutation();

  useEffect(() => {
    console.log('aa');
    expenseTypes.forEach((e) => {
      createExpenseType({ variables: { expenseType: { name: e.name, projectId: 1049, description: e.id.toString() } } });
    });
  }, []);

  return <div />;
};

export default DevOld;
