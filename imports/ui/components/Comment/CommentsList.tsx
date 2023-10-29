import { Flex, Skeleton, Title } from "@mantine/core";
import React, { useState } from "react";
import CommentPreview, { CommentsPreviewLoading } from "./CommentPreview";
import randAvat from "/imports/utils/random-avatar";
import { CommentsListProps } from "/imports/types/ui/components/Comment/CommentsListProps";
import AddEditComment from "./AddEditComment";
import AppModal from "../AppModal";
import { IComment } from "/imports/types/models/Comment";
import _default from "@mantine/core/lib/ActionIcon/ActionIcon.styles";
import { useDeleteComment } from "/imports/hooks/requests/Comments";
import { showNotification } from "@mantine/notifications";

export const CommentsListLoading = () => {
  return (
    <Flex
      className={`w-2/5 mt-10`}
      direction="column"
      gap={10}
      justify="start"
      align="stretch"
    >
      <Skeleton height={40} mb={40} width={200} radius="sm" />
      {"xxxx".split("").map((_, index) => (
        <CommentsPreviewLoading key={index} />
      ))}
    </Flex>
  );
};

interface ICommentWithEdit extends IComment {
  edit: boolean;
}

export default function CommentsList({
  articleId,
  comments,
  className,
}: CommentsListProps) {
  const [deletedComment, setDeletedComment] = useState<string | null>(null);
  const [currComments, setCurrComments] = useState<ICommentWithEdit[]>(
    comments.map((comment) => ({ ...comment, edit: false }))
  );
  const deleteComment = useDeleteComment({
    onSuccess: () => {
      showNotification({
        title: "Comment deleted!",
        message: "Your comment was deleted successfully!",
        color: "green",
      });
      setDeletedComment(null);
    },
  });
  return (
    <Flex
      className={`w-2/5 ${className ?? ""}`}
      direction="column"
      gap={10}
      justify="start"
      align="stretch"
    >
      <AppModal
        modalText="Are you sure want to delete this comment?"
        opened={!!deletedComment}
        loading={deleteComment.isLoading}
        onYes={() => deleteComment.mutate(deletedComment!)}
        onClose={() => setDeletedComment(null)}
      />
      <Title className="mb-10" order={1}>
        Comments
      </Title>
      {currComments.map(({ _id, text, createdById, createdOn, edit }) => {
        return edit ? (
          <AddEditComment
            onEditCompelete={(_id) => {
              setCurrComments(
                currComments.map((comment) => {
                  if (comment._id === _id) {
                    return { ...comment, edit: false };
                  }
                  return comment;
                })
              );
            }}
            articleId={articleId}
            key={_id}
            _id={_id}
            image={randAvat()}
            text={text}
          />
        ) : (
          <CommentPreview
            _id={_id ?? ""}
            image={randAvat()}
            date={createdOn ?? Date.now()}
            key={_id}
            text={text}
            author={createdById ?? "Test Author"}
            onDelete={() => setDeletedComment(_id ?? null)}
            onEdit={() => {
              setCurrComments(
                currComments.map((comment) => {
                  if (comment._id === _id) {
                    return { ...comment, edit: true };
                  }
                  return comment;
                })
              );
            }}
          />
        );
      })}
      <AddEditComment articleId={articleId} image={randAvat()} />
    </Flex>
  );
}
