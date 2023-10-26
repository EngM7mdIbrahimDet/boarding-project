import React, { useEffect } from "react";
import { ArticlesListProps } from "/imports/types/ui/components/Article/ArticlesListProps";
import { Card, Center, Title } from "@mantine/core";
import ArticlePreview, { ArticlePreviewLoading } from "./ArticlePreview";
import { IconArticleOff, IconFaceIdError } from "@tabler/icons";
import { ArticleErrorProps } from "/imports/types/ui/components/Article/ArticleErrorProps";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import AddArticlePreview from "./AddArticlePreview";
import { ACCENT_COLOUR } from "/imports/constants/styles";

const ArticleError = ({ error }: ArticleErrorProps) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <Card
      style={{ minHeight: "400px" }}
      className="w-2/5 flex flex-col gap-5 justify-center items-center"
      withBorder
      shadow="xl"
    >
      <IconFaceIdError className="block" color="red" size={200} />
      <Title align="center" order={2}>
        Error!{" "}
        {error && error instanceof Meteor.Error
          ? error.reason
          : "Something went wrong! Please try again later!"}
      </Title>
    </Card>
  );
};
const ArticlesEmpty = () => {
  return (
    <Card
      style={{ minHeight: "400px" }}
      className="w-2/5 flex flex-col gap-5 justify-center items-center"
      withBorder
      shadow="xl"
    >
      <IconArticleOff className="block" color={ACCENT_COLOUR} size={200} />
      <Title order={2}>No articles are here in the space! </Title>
    </Card>
  );
};
export default function ArticlesList({
  loading,
  articles,
  error,
}: ArticlesListProps) {
  const goTo = useNavigate();
  return (
    <Center className="flex flex-1 flex-col gap-5 max-w-screen-2xl ">
      {loading ? (
        "xxxx"
          .split("")
          .map((_, index) => <ArticlePreviewLoading key={index} />)
      ) : error ? (
        <ArticleError error={error} />
      ) : articles.length === 0 ? (
        <ArticlesEmpty />
      ) : (
        <>
          <AddArticlePreview />
          {articles.map((article) => (
            <ArticlePreview
              key={article._id}
              author={article.createdById ?? "Anonymous"}
              date={article.createdOn ?? Date.now()}
              text={article.text}
              title={article.title}
              buttonText="Show Comments"
              onPress={() => {
                goTo("/articles/" + article._id);
              }}
            />
          ))}
        </>
      )}
    </Center>
  );
}
