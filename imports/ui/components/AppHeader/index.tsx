import React from "react";
import { Button, Flex, Header, Image, Space, Title } from "@mantine/core";
import ThemeSwitch from "/imports/ui/components/ThemeSwitch";
export default function AppHeader() {
  return (
    <Header height={60} p="xs">
      <Flex
        p="md"
        justify="center"
        align="center"
        gap={5}
        className="w-full h-full"
        direction={"row"}
      >
        <Image
          className=""
          width={30}
          height={30}
          fit="contain"
          src="logo.png"
        />
        <Title className=" ml-2 flex-1" order={2}>
          Articles
        </Title>
        <ThemeSwitch />
      </Flex>
    </Header>
  );
}
