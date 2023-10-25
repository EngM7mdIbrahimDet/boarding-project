import React from "react";
import {
  ArticleHeaderProps,
  ArticlePreviewProps,
} from "/imports/types/ui/components/Article/ArticlePreviewProps";
import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import timeAgo from "/imports/utils/date-formatter";

const ArticleHeader = ({ author }: ArticleHeaderProps) => {
  return (
    <Flex gap={10} justify="start" align="center" style={{ height: 50 }}>
      <Image src="avatar.png" height={40} width={40} fit="contain" />
      <Title order={2}>{author}</Title>
    </Flex>
  );
};

export default function ArticlePreview({
  author,
  text,
  buttonText,
  onPress,
  date
}: ArticlePreviewProps) {
    const theme = useMantineTheme();
  return (
    <Card
      style={{ minHeight: "400px" }}
      className="w-2/5 flex flex-col"
      withBorder
      shadow="xl"
    >
      <Box className=" flex flex-col flex-1 gap-2">
        <ArticleHeader author={author} />
        <Text mt="md" className="flex-1 break-words text-ellipsis" lineClamp={3}>
          {text}
        </Text>
        <Text color={theme.colorScheme === 'light' ? 'dimmed' : 'blue'} >Posted {timeAgo(date)} </Text>
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
