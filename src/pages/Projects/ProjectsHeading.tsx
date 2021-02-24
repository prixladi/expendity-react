import React from 'react';
import { useDisclosure, Box, Icon } from '@chakra-ui/react';
import InfoText from '../../components/Text';
import { Button } from '../../components/Button';
import NewProjectModal from './NewProjectModal';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import withAuthentication from '../../hoc/withAuthentication';
import DefaultSkelleton from '../../components/DefaultSkelleton';
import H1 from '../../components/H1';

const ProjectsHeading: React.FC = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <H1>Your projects</H1>

      <InfoText>
        Below is table of projects you have permissions to access. Here you can create new project or edit existing. By clicking on name of
        the project you will go to detail.
      </InfoText>

      <Box mt="1em" mb="0.7em">
        <Button onClick={onOpen}>
          Add new Project <Icon ml="0.2em" as={AiOutlineFundProjectionScreen} />
        </Button>
      </Box>

      <NewProjectModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default withAuthentication(ProjectsHeading, DefaultSkelleton);
