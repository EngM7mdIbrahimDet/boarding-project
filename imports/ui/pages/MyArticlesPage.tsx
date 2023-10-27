import React from "react";
import Page from "../layouts/Page";
import { useGetMyArticles } from "/imports/hooks/requests/Articles";
import ArticlesList from "../components/Article/ArticlesList";
import useCurrentUser from "/imports/hooks/current-user";

export default function MyArticlesPage() {
  const currentUser = useCurrentUser();
  const { data, isLoading, error } = useGetMyArticles(currentUser?._id ?? "");
  return (
    <Page className="py-7" stack>
      <ArticlesList loading={isLoading} articles={data ?? []} error={error} />
    </Page>
  );
}
