import {
  ActionIcon,
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
import useCurrentUser from "/imports/hooks/current-user";
import { IconEdit, IconTrashX } from "@tabler/icons";

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
        <Skeleton height={15} width={150} />
      </Box>
    </Box>
  );
};

export default function CommentPreview({
  author,
  image,
  text,
  date,
  _id,
  onDelete,
  onEdit,
}: CommentsPreviewProps) {
  const theme = useMantineTheme();
  const currentUser = useCurrentUser();
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
          <Box className="flex gap-2">
            <Title className="flex-1" order={4}>
              {currentUser?._id === author ? "You" : author}
            </Title>
            {currentUser?._id === author && (
              <>
                <>
                  <ActionIcon
                    variant="light"
                    onClick={() => {
                      onEdit(_id);
                    }}
                  >
                    <IconEdit size={20} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    color="red"
                    onClick={() => {
                      onDelete(_id);
                    }}
                  >
                    <IconTrashX size={20} />
                  </ActionIcon>
                </>
              </>
            )}
          </Box>
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
