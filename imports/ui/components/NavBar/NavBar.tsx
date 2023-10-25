import React from "react";
import { Divider, Navbar, Text } from "@mantine/core";
import { IconArticle, IconLogin, IconLogout, IconUser, IconUserPlus } from "@tabler/icons";
import NavBarItems from "./NavBarItems";
import useCurrentUser from "/imports/hooks/current-user";
import { INavBarItem } from "/imports/types/ui/components/NavBar/NavBarItemProps";
import { ROUTES } from "/imports/routes/routes";
import NavBarItem from "./NavBarItem";
import { Meteor } from "meteor/meteor";
import { showNotification } from "@mantine/notifications";
import { useLogoutUser } from "/imports/hooks/requests/Acccounts";
import { useNavigate } from "react-router-dom";

export const sharedUserOptions: INavBarItem[] = [
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
  const goTo = useNavigate();
  const logOut = useLogoutUser({
    onSuccess(){
      showNotification({
        title: "Farewell!",
        message: "See you later!",
        color: "green",
      });
      goTo(ROUTES.LOG_IN);
    }
  })
  return (
    <Navbar className="flex" width={{ base: 300 }}>
      <NavBarItems options={currentUser ? loggedInOptions : guestOptions} />
      {currentUser && <>
        <Divider/>
        <NavBarItem label={`Hello, ${(currentUser.profile as any)?.name ?? "User"}`} icon={<IconUser/>} onPress={()=>{
          showNotification({
            title: "Hi There!",
            message: "Yes, here you are!",
            color: "green",
          })
        }} isSelected={false}/>
        <NavBarItem label="Logout" icon={<IconLogout/>} onPress={()=>{
          logOut.mutate({});
        }} isSelected={false}/>
        
      </>}
    </Navbar>
  );
}
