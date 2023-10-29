import React from "react";
import {
  ArticleHeaderProps,
  ArticlePreviewProps,
} from "/imports/types/ui/components/Article/ArticlePreviewProps";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  Image,
  Skeleton,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import timeAgo from "/imports/utils/date-formatter";
import randAvat from "/imports/utils/random-avatar";
import { IconEdit, IconTrashX } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "/imports/hooks/current-user";

const ArticleHeader = ({ author, title, _id, onDelete }: ArticleHeaderProps) => {
  const goTo = useNavigate();
  return (
    <Flex gap={10} justify="start" align="center" style={{ height: 50 }}>
      <Image src={randAvat()} height={40} width={40} fit="contain" />
      <Box className=" flex flex-col justify-start items-start flex-1">
        <Title className="m-0" order={4}>
          {title}
        </Title>
        <Text>{author}</Text>
      </Box>
      {_id && (
        <>
        <ActionIcon
          variant="light"
          onClick={() => {
            goTo(`/articles/${_id}/edit`);
          }}
        >
          <IconEdit size={20} />
        </ActionIcon>
        <ActionIcon
          variant="light"
          color="red"
          onClick={()=>{onDelete(_id)}}
        >
          <IconTrashX size={20} />
        </ActionIcon></>
        
      )}
    </Flex>
  );
};

export const ArticlePreviewLoading = () => {
  return (
    <Card
      style={{ minHeight: "400px" }}
      className="w-2/5 flex flex-col"
      withBorder
      shadow="xl"
    >
      <Flex
        mb="xl"
        gap={10}
        justify="start"
        align="center"
        style={{ height: 50 }}
      >
        <Skeleton height={50} circle />
        <Box className=" flex flex-col justify-start items-start flex-1">
          <Skeleton height={18} width="70%" radius="xl" />
          <Skeleton height={10} mt="md" width="30%" radius="xl" />
        </Box>
      </Flex>
      <Box className="flex-1">
        <Skeleton height={12} radius="xl" />
        <Skeleton height={12} mt={6} radius="xl" />
        <Skeleton height={12} mt={6} radius="xl" />
        <Skeleton height={12} mt={6} radius="xl" />
        <Skeleton height={12} mt={6} radius="xl" />
        <Skeleton height={12} mt={6} radius="xl" />
        <Skeleton height={12} mt={6} width="70%" radius="xl" />
      </Box>
      <Skeleton height={10} mt={6} width="30%" radius="xl" />
      <Skeleton height={30} mt={6} radius="sm" />
    </Card>
  );
};

export default function ArticlePreview({
  _id,
  authorId,
  author,
  text,
  buttonText,
  onPress,
  onDelete,
  date,
  title,
}: ArticlePreviewProps) {
  const theme = useMantineTheme();
  const currentUser = useCurrentUser();
  return (
    <Card
      style={{ minHeight: "400px" }}
      className="w-2/5 flex flex-col"
      withBorder
      shadow="xl"
    >
      <Box className=" flex flex-col flex-1 gap-2">
        <ArticleHeader
        onDelete={onDelete}
          title={title}
          _id={currentUser?._id === author ? _id : undefined}
          author={currentUser?._id === authorId ? "You" : author}
        />
        <Text
          mt="md"
          className="flex-1 break-words text-ellipsis"
          lineClamp={3}
        >
          {text}
        </Text>
        <Text color={theme.colorScheme === "light" ? "dimmed" : "blue"}>
          Posted {timeAgo(date)}{" "}
        </Text>
        {buttonText && (
          <Button
            onClick={() => {
              if (onPress) onPress();
            }}
            variant="light"
            fullWidth
          >
            {buttonText}
          </Button>
        )}
      </Box>
    </Card>
  );
}
