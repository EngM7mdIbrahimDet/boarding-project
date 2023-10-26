import React from "react";
import Page from "../layouts/Page";
import AddEditArticle from "../components/Article/AddEditArticle";
import randAvat from "/imports/utils/random-avatar";

export default function AddArticlePage() {
  return (
    <Page className="py-7 flex justify-center items-center">
      <AddEditArticle image={randAvat()}/>
    </Page>
  );
}
