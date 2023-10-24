import React from "react";
import { Hello } from "./Hello";
import { MantineProvider } from "@mantine/core";
import useGlobalStore from "../hooks/store";
import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import LoggedInRoute from "../routes/LoggedInRoute";
import { ROUTES } from "../routes/routes";
import GuestRoute from "../routes/GuestRoute";
import Page from "./layouts/Page";

export const App = () => {
  const { theme } = useGlobalStore();
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      theme={{ colorScheme: theme }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.ARTICLES}
            element={
              <GuestRoute>
                <Hello />
              </GuestRoute>
            }
          />
          <Route
            path={ROUTES.SINGLE_ARTICLE}
            element={
              <GuestRoute>
                <Hello />
              </GuestRoute>
            }
          />
          <Route
            path={ROUTES.LOG_IN}
            element={
              <GuestRoute>
                <Hello />
              </GuestRoute>
            }
          />
          <Route
            path={ROUTES.REGISTER}
            element={
              <GuestRoute>
                <Hello />
              </GuestRoute>
            }
          />
          <Route
            path={ROUTES.NOT_FOUND}
            element={
              <GuestRoute>
                <Page> <Hello /></Page>
               
              </GuestRoute>
            }
          />
          <Route
            path={ROUTES.ADD_ARTICLE}
            element={
              <LoggedInRoute>
                <Hello />
              </LoggedInRoute>
            }
          />
          <Route
            path={ROUTES.EDIT_ARTICLE}
            element={
              <LoggedInRoute>
                <Hello />
              </LoggedInRoute>
            }
          />
          <Route
            path={ROUTES.MY_ARTICLES}
            element={
              <LoggedInRoute>
                <Hello />
              </LoggedInRoute>
            }
          />
          <Route
            path="*"
            element={
              <Navigate to={ROUTES.NOT_FOUND}/>
            }
            />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};
