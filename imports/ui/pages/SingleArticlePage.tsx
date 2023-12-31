import React, { useState } from "react";
import Page from "../layouts/Page";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteArticle,
  useGetSingleArticle,
} from "/imports/hooks/requests/Articles";
import ArticlePreview, {
  ArticlePreviewLoading,
} from "../components/Article/ArticlePreview";
import AppModal from "../components/AppModal";
import { useQueryClient } from "react-query";
import { showNotification } from "@mantine/notifications";
import useCurrentUser from "/imports/hooks/current-user";
import CommentsList, {
  CommentsListLoading,
} from "../components/Comment/CommentsList";
import useSubscribeComments from "/imports/hooks/publications/useSubscribeComments";

export default function SingleArticlePage() {
  const { id } = useParams();
  const [deletedPost, setDeletedPost] = useState<string | null>(null);
  const { data: article, isLoading } = useGetSingleArticle(id as string, {});
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const { comments, isLoading: isCommentsLoading } = useSubscribeComments({
    articleId: id as string,
  });
  console.log("In compo",comments);
  const goTo = useNavigate();
  const deleteArticle = useDeleteArticle({
    onSuccess() {
      showNotification({
        title: "Article Deleted!",
        message: "Article has been deleted successfully!",
        color: "green",
      });
      setDeletedPost(null);
      queryClient.invalidateQueries("getArticles");
      queryClient.invalidateQueries("getMyArticles");
      goTo(-1);
    },
  });
  return (
    <Page className="py-7 gap-2 flex flex-col justify-start items-center">
      {isLoading || isCommentsLoading ? (
        <>
          <ArticlePreviewLoading />
          <CommentsListLoading />
        </>
      ) : (
        <>
          <AppModal
            opened={!!deletedPost}
            loading={deleteArticle.isLoading}
            modalText="Are you sure you want to delete this article?"
            onClose={() => setDeletedPost(null)}
            onYes={() => {
              deleteArticle.mutate(deletedPost as string);
            }}
          />
          <ArticlePreview
            author={article?.author?.profile?.name ?? "Anonymous"}
            _id={currentUser ? id : undefined}
            authorId={article?.createdById ?? ""}
            date={article?.createdOn ?? Date.now()}
            text={article?.text ?? "Test Text"}
            title={article?.title ?? "Test Title"}
            onDelete={() => {
              setDeletedPost(id as string);
            }}
          />
          <CommentsList
            articleId={id ?? ""}
            className="mt-10"
            comments={comments}
          />
        </>
      )}
    </Page>
  );
}
