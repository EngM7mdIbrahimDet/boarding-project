
import React from 'react';
import { Switch, useMantineTheme } from "@mantine/core";
import {IconMoonStars, IconSun} from '@tabler/icons'
import useGlobalStore from "/imports/hooks/store";

export default function ThemeSwitch(){
    const theme = useMantineTheme();
    const {setTheme} = useGlobalStore();
   const sunIcon = (
    <IconSun
      style={{ width: 16, height: 16 }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: 16, height: 16 }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return <Switch defaultChecked={true} onChange={(e)=>{
    setTheme(e.currentTarget.checked ? 'light' : 'dark')
  }} size="md" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} />;
}