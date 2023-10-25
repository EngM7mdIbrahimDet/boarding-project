import React from "react";
import Page from "../layouts/Page";
import ArticlePreview from "../components/Article/ArticlePreview";
import { Center } from "@mantine/core";

export default function ArticlesPage() {
  return (
    <Page className="py-7" stack>
      <Center className=" max-w-screen-2xl ">
        <ArticlePreview author="John Doe" text="sfdkjandasjkdn" buttonText="Show Article" date={Date.now()} />
      </Center>
    </Page>
  );
}
