import * as React from 'react';
import { useColorMode, useColorModeValue, Switch, Icon } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeSwitcher: React.FC = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <>
      <Icon
        mr="0.5em"
        fontSize={['1.2em', '1.3em', '1.3em', '2.5em']}
        color="current"
        aria-label={`Switch to ${text} mode`}
        as={SwitchIcon}
      />
      <Switch size="lg" isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
    </>
  );
};

export default ColorModeSwitcher;
