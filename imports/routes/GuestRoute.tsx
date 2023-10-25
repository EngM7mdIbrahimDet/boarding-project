
import React from "react";
import { Navigate, useLocation, matchPath } from "react-router-dom";
import { ReactElement } from "react";
import { ROUTES } from "./routes";
import AppLayout from "../ui/layouts/AppLayout";
import useCurrentUser from "../hooks/current-user";
import { guestOptions, sharedUserOptions } from "../ui/components/NavBar/NavBar";

export default function GuestRoute({ children }: { children: ReactElement }) {
  const currentUser = useCurrentUser();
  const location = useLocation();
  return currentUser &&
    Boolean(
      guestOptions.some((option) =>
        Boolean(matchPath(option.route, location.pathname))
      ) && !sharedUserOptions.some((option) =>
        Boolean(matchPath(option.route, location.pathname))
      )
    ) ? (
    <Navigate to={ROUTES.ARTICLES} />
  ) : (
    <AppLayout>{children}</AppLayout>
  );
}
