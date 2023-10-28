import {
  Box,
  Card,
  Image,
  Skeleton,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { CommentsPreviewProps } from "/imports/types/ui/components/Comment/CommentPreviewProps";
import { BG_DARK_COLOR, BG_LIGHT_COLOR } from "/imports/constants/styles";
import timeAgo from "/imports/utils/date-formatter";

export const CommentsPreviewLoading = () => {
  const theme = useMantineTheme();
  return (
    <Box className="flex items-start justify-start gap-5 w-full">
      <Skeleton height={40} circle />
      <Box className="flex flex-1 flex-col gap-1">
        <Card
          bg={theme.colorScheme === "dark" ? BG_DARK_COLOR : BG_LIGHT_COLOR}
          p="sm"
          withBorder    
          radius="md"
          style={{ minHeight: 120 }}
          className=" flex flex-col justify-start items-stretch"
        >
          <Skeleton height={15} width={200} />
          <Skeleton height={12} mt={6} radius="xl" />
          <Skeleton height={12} mt={6} radius="xl" />
          <Skeleton height={12} mt={6} radius="xl" />
        </Card>
        <Skeleton height={15} width={150}/>
      </Box>
    </Box>
  );
};

export default function CommentPreview({
  author,
  image,
  text,
  date,
}: CommentsPreviewProps) {
  const theme = useMantineTheme();
  return (
    <Box className="flex items-start justify-start gap-5 w-full">
      <Image src={image} height={40} width={40} fit="contain" />
      <Box className="flex-1 flex flex-col gap-1">
        <Card
          bg={theme.colorScheme === "dark" ? BG_DARK_COLOR : BG_LIGHT_COLOR}
          p="sm"
          withBorder
          radius="md"
          style={{ minHeight: 120 }}
          className="w-full flex flex-col justify-start items-stretch"
        >
          <Title order={4}>{author}</Title>
          <Text
            className="w-full h-20 break-words text-ellipsis"
            lineClamp={10}
          >
            {text}
          </Text>
        </Card>
        <Text color={theme.colorScheme === "light" ? "dimmed" : "blue"}>
          {timeAgo(date ?? Date.now())}
        </Text>
      </Box>
    </Box>
  );
}
