import React, { useState } from "react";
import { ArticlesListProps } from "/imports/types/ui/components/Article/ArticlesListProps";
import {
  Card,
  Center,
  Title,
} from "@mantine/core";
import ArticlePreview, { ArticlePreviewLoading } from "./ArticlePreview";
import { IconArticleOff, IconFaceIdError } from "@tabler/icons";
import { ArticleErrorProps } from "/imports/types/ui/components/Article/ArticleErrorProps";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import AddArticlePreview from "./AddArticlePreview";
import { ACCENT_COLOUR } from "/imports/constants/styles";
import { showNotification } from "@mantine/notifications";
import { useDeleteArticle } from "/imports/hooks/requests/Articles";
import { useQueryClient } from "react-query";
import AppModal from "../AppModal";

const ArticleError = ({ error }: ArticleErrorProps) => {
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
  const [deletedPost, setDeletedPost] = useState<string | null>(null);
  const querClient = useQueryClient();
  const deleteArticle = useDeleteArticle({
    onSuccess() {
      showNotification({
        title: "Article Deleted!",
        message: "Article has been deleted successfully!",
        color: "green",
      });
      setDeletedPost(null);
      querClient.invalidateQueries("getArticles");
      querClient.invalidateQueries("getMyArticles");
    },
  });
  return (
    <Center className="flex flex-1 flex-col gap-5 max-w-screen-2xl ">
      <AppModal
        loading={deleteArticle.isLoading}
        modalText="Are you sure you want to delete the article ?"
        onClose={()=>{setDeletedPost(null)}}
        onYes={()=>{deleteArticle.mutate(deletedPost as string)}}
        opened={!!deletedPost}
      />
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
              onDelete={() => {
                setDeletedPost(article?._id ?? null);
              }}
              _id={article._id}
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
