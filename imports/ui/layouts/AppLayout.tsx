import React from 'react';
import { AppShell, ScrollArea } from "@mantine/core";
import NavBar from "../components/NavBar/NavBar";
import LoggedInAppHeader from "../components/AppHeader";
// import { ReactNode } from "react";

export default function AppLayout({ children }: { children: any }) {
  return (
    <AppShell
      padding="md"  
      navbar={<NavBar/>}
      header={<LoggedInAppHeader/>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <ScrollArea style={{minHeight: 'calc(100vh - 90px)'}} className='w-full border-2 border-black'>
        {children}
      </ScrollArea>
    </AppShell>
  );
}