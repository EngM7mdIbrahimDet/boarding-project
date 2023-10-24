import React from "react";
import { Divider, Navbar } from "@mantine/core";
import { IconArticle, IconLogin, IconLogout, IconUser, IconUserPlus } from "@tabler/icons";
import NavBarItems from "./NavBarItems";
import useCurrentUser from "/imports/hooks/current-user";
import { INavBarItem } from "/imports/types/ui/components/NavBar/NavBarItemProps";
import { ROUTES } from "/imports/routes/routes";
import NavBarItem from "./NavBarItem";

const sharedUserOptions: INavBarItem[] = [
  { label: "All Articles", icon: <IconArticle />, route: ROUTES.ARTICLES },
];
export const guestOptions: INavBarItem[] = [
  ...sharedUserOptions,
  { label: "Login", icon: <IconLogin />, route: ROUTES.LOG_IN },
  { label: "Register", icon: <IconUserPlus />, route: ROUTES.REGISTER },
];
export const loggedInOptions: INavBarItem[] = [
  ...sharedUserOptions,
  { label: "My Articles", icon: <IconUser />, route: ROUTES.MY_ARTICLES },
];

export default function LoggedInNavBar() {
  const currentUser = useCurrentUser();

  return (
    <Navbar className="flex" width={{ base: 300 }}>
      <NavBarItems options={currentUser ? loggedInOptions : guestOptions} />
      {currentUser && <>
        <Divider/>
        <NavBarItem label="Logout" icon={<IconLogout/>} onPress={()=>{
          // Meteor logsout here
        }} route={ROUTES.LOG_IN} isSelected={false}/>
      </>}
    </Navbar>
  );
}
