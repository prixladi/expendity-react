import React, { useMemo } from 'react';
import { useDisclosure, Box, Icon } from '@chakra-ui/react';
import InfoText from '../../components/Text';
import { Button } from '../../components/Button';
import H1 from '../../components/H1';
import { PermissionType } from '../../graphql';
import { greaterOrEqualPermission } from '../../utils';
import { GiMoneyStack } from 'react-icons/gi';
import NewExpenseTypeModal from './NewExpenseTypeModal';

type Props = {
  userPermission: PermissionType;
  projectId: number;
};

const ExpeseTypesHeading: React.FC<Props> = ({ userPermission, projectId }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const isProjectAdmin = useMemo(() => greaterOrEqualPermission(userPermission, PermissionType.Configure), [userPermission]);

  return (
    <>
      <H1>Expense types</H1>

      <InfoText>Bellow is table of expense types for current project. Expense types are used for categorization of expenses.</InfoText>

      <Box mt="1em" mb="0.7em">
        {isProjectAdmin ? (
          <Button onClick={onOpen}>
            Add new Expense Type <Icon ml="0.2em" as={GiMoneyStack} />
          </Button>
        ) : null}
      </Box>

      <NewExpenseTypeModal projectId={projectId} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ExpeseTypesHeading;
