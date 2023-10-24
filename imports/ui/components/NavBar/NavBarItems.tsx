import React from "react";
import { NavBarItemsProps } from "/imports/types/ui/components/NavBar/NavBarItemsProps";
import { useLocation, matchPath } from "react-router-dom";
import NavBarItem from "./NavBarItem";
import { Stack } from "@mantine/core";

export default function NavBarItems({ options }: NavBarItemsProps) {
  const location = useLocation();
  return (
    <Stack className="p-0 flex-1">
      {options.map((option, index) => (
        <NavBarItem
          key={index}
          label={option.label}
          icon={option.icon}
          isSelected={Boolean(matchPath(option.route, location.pathname))}
          route={option.route}
        />
      ))}
    </Stack>
  );
}
