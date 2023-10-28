import React from "react";
import { Hello } from "./Hello";
import { MantineProvider } from "@mantine/core";
import useGlobalStore from "../hooks/store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoggedInRoute from "../routes/LoggedInRoute";
import { ROUTES } from "../routes/routes";
import GuestRoute from "../routes/GuestRoute";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import { NotificationsProvider } from "@mantine/notifications";
import RegisterPage from "./pages/RegisterPage";
import { QueryClient, QueryClientProvider } from "react-query";
import AddArticlePage from "./pages/AddArticlePage";
import ArticlesPage from "./pages/ArticlesPage";
import EditArticlePage from "./pages/EditArticlePage";
import MyArticlesPage from "./pages/MyArticlesPage";
import SingleArticlePage from "./pages/SingleArticlePage";

const queryClient = new QueryClient();
export const App = () => {
  const { theme } = useGlobalStore();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withCSSVariables withGlobalStyles theme={theme}>
        <NotificationsProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path={ROUTES.ARTICLES}
                element={
                  <GuestRoute>
                    <ArticlesPage />
                  </GuestRoute>
                }
              />
              <Route
                path={ROUTES.LOG_IN}
                element={
                  <GuestRoute>
                    <LoginPage />
                  </GuestRoute>
                }
              />
              <Route
                path={ROUTES.REGISTER}
                element={
                  <GuestRoute>
                    <RegisterPage />
                  </GuestRoute>
                }
              />
              <Route
                path={ROUTES.NOT_FOUND}
                element={
                  <GuestRoute>
                    <NotFoundPage />
                  </GuestRoute>
                }
              />
              <Route
                path={ROUTES.MY_ARTICLES}
                element={
                  <LoggedInRoute>
                    <MyArticlesPage />
                  </LoggedInRoute>
                }
              />
              <Route
                path={ROUTES.ADD_ARTICLE}
                element={
                  <LoggedInRoute>
                    <AddArticlePage />
                  </LoggedInRoute>
                }
              />
              <Route
                path={ROUTES.EDIT_ARTICLE}
                element={
                  <LoggedInRoute>
                    <EditArticlePage />
                  </LoggedInRoute>
                }
              />
              <Route
                path={ROUTES.SINGLE_ARTICLE}
                element={
                  <GuestRoute>
                    <SingleArticlePage />
                  </GuestRoute>
                }
              />
              <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} />} />
            </Routes>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
