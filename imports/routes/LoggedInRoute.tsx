import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import { ROUTES } from "./routes";
import AppLayout from "../ui/layouts/AppLayout";
import useCurrentUser from "../hooks/current-user";

export default function LoggedInRoute({
  children,
}: {
  children: ReactElement;
}) {
  const currentUser = useCurrentUser();
  if (currentUser) {
    return <AppLayout>{children}</AppLayout>;
  } else {
    return <Navigate to={ROUTES.LOG_IN} />;
  }
}
