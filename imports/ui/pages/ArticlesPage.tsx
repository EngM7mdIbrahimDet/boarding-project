import React, { useEffect } from "react";
import Page from "../layouts/Page";
import { useGetAllArticles } from "/imports/hooks/requests/Articles";
import ArticlesList from "../components/Article/ArticlesList";

export default function ArticlesPage() {
  const { data, isLoading, error } = useGetAllArticles();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Page className="py-7" stack>
      <ArticlesList loading={isLoading} articles={data ?? []} error={error} />
    </Page>
  );
}
