import React from 'react';
import { Flex, useBreakpointValue, Text, Icon, MenuButton, Menu, MenuList, MenuItem } from '@chakra-ui/react';
import TextLogo from '../components/TextLogo';
import ColorModeButton from './ColorModeButton';
import { useAuthorityManager } from '../authority';
import { Link, useHistory } from 'react-router-dom';
import { ProjectsRoute, ProfileRoute } from '../routes';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { FaBars, FaUserAlt } from 'react-icons/fa';
import ColorModeSwitcher from './ColorModeSwitcher';

const AuthorizedNavbarItems = () => {
  const isCompact = useBreakpointValue([true, true, true, false]);
  const history = useHistory();

  if (isCompact) {
    return (
      <>
        <TextLogo />
        <Menu>
          <MenuButton aria-label="Toggle Menu" fontSize="1.5em">
            <Flex alignItems="top">
              <Icon as={FaBars} />
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => history.push(ProjectsRoute)}>
              <Link to={ProjectsRoute}>Projects</Link>
            </MenuItem>
            <MenuItem onClick={() => history.push(ProfileRoute)}>
              <Link to={ProfileRoute}>Profile</Link>
            </MenuItem>
            <MenuItem>
              <ColorModeSwitcher />
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  }

  return (
    <>
      <Flex gridGap={['1em', '2em', '3em', '4em']}>
        <TextLogo />
        <Link to={ProjectsRoute}>
          <Text color="brand.500" fontWeight="700">
            Projects <Icon mb="0.2em" as={AiOutlineFundProjectionScreen} />
          </Text>
        </Link>
        <Link to={ProfileRoute}>
          <Text color="brand.500" fontWeight="700">
            Profile <Icon mb="0.2em" as={FaUserAlt} />
          </Text>
        </Link>
      </Flex>
      <ColorModeButton />
    </>
  );
};

const NavBar: React.FC = () => {
  const margin = useBreakpointValue(['0rem', '0rem', '2rem', '6rem']);
  const manager = useAuthorityManager();

  if (manager.isUserLoggedIn()) {
    return (
      <Flex ml={margin} mr={margin} mt="0.5em" fontSize="2em" justifyContent="space-between">
        <AuthorizedNavbarItems />
      </Flex>
    );
  }

  return (
    <Flex ml={margin} mr={margin} mt="0.5em" fontSize="2em" justifyContent="space-between">
      <TextLogo /> <ColorModeButton />{' '}
    </Flex>
  );
};

export default NavBar;
