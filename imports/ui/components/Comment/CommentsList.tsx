import { Flex, Skeleton, Title } from "@mantine/core";
import React from "react";
import CommentPreview, { CommentsPreviewLoading } from "./CommentPreview";
import randAvat from "/imports/utils/random-avatar";
import { CommentsListProps } from "/imports/types/ui/components/Comment/CommentsListProps";
import AddEditComment from "./AddEditComment";

export const CommentsListLoading = () => {
  return <Flex
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
  </Flex>;
};

export default function CommentsList({
  comments,
  className,
}: CommentsListProps) {
  return (
    <Flex
      className={`w-2/5 ${className ?? ""}`}
      direction="column"
      gap={10}
      justify="start"
      align="stretch"
    >
      <Title className="mb-10" order={1}>
        Comments
      </Title>
      {comments.map(({ _id, text, createdById, createdOn }) => (
        <CommentPreview
          image={randAvat()}
          date={createdOn ?? Date.now()}
          key={_id}
          text={text}
          author={createdById ?? "Test Author"}
        />
      ))}
      <AddEditComment image={randAvat()} />
    </Flex>
  );
}
