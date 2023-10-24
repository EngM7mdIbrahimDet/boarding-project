import { Flex, Title, useMantineTheme } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBarItemProps } from "/imports/types/ui/components/NavBar/NavBarItemProps";

export default function NavBarItem({
  label,
  icon,
  route,
  isSelected,
  onPress,
}: NavBarItemProps) {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  return (
    <Flex
      onClick={() => {
        if (onPress) onPress();
        navigate(route);
      }}
      direction="row"
      gap={5}
      justify="start"
      align="stretch"
      p="sm"
      className={`w-full ${
        isSelected
          ? theme.colorScheme === "dark"
            ? "bg-blue-950"
            : "bg-blue-200"
          : ""
      }`}
    >
      {icon}
      <Title order={4}>{label}</Title>
    </Flex>
  );
}
