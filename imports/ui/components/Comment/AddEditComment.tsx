import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Card,
  Image,
  Overlay,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { AddEditCommentProps } from "/imports/types/ui/components/Comment/AddEditCommentProps";
import { BG_DARK_COLOR, BG_LIGHT_COLOR } from "/imports/constants/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCurrentUser from "/imports/hooks/current-user";
import { ROUTES } from "/imports/routes/routes";
import { useNavigate } from "react-router-dom";
import {
  useAddComment,
  useUpdateComment,
} from "/imports/hooks/requests/Comments";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";

export default function AddEditComment({
  image,
  _id,
  articleId,
  text,
  onEditCompelete,
}: AddEditCommentProps) {
  const theme = useMantineTheme();
  const goTo = useNavigate();
  const addComment = useAddComment(articleId, {
    onSuccess: () => {
      formik.resetForm();
      showNotification({
        title: "Comment added!",
        message: "Your comment was added successfully!",
        color: "green",
      });
    },
  });
  const editComment = useUpdateComment(_id ?? "", {
    onSuccess: () => {
      showNotification({
        title: "Comment updated!",
        message: "Your comment was updated successfully!",
        color: "green",
      });
      if (onEditCompelete) onEditCompelete(_id!);
    },
  });
  const currentUser = useCurrentUser();
  const formik = useFormik({
    validationSchema: Yup.object({
      text: Yup.string().required("You can't post an empty comment!"),
    }),
    initialValues: {
      text: text ?? "",
    },
    onSubmit: (values) => {
      _id ? editComment.mutate(values) : addComment.mutate(values);
    },
  });
  const reRoute =
    (isLogin: boolean) =>
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      goTo(isLogin ? ROUTES.LOG_IN : ROUTES.REGISTER);
    };
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
          className="w-full flex flex-col justify-start items-stretch relative"
        >
          <Box className="flex justify-start items-center">
            <Title className="flex-1" order={4}>
              You
            </Title>
            {_id && (
              <ActionIcon
                variant="light"
                color="red"
                onClick={() => {
                  onEditCompelete!(_id!);
                }}
              >
                <IconX size={20} />
              </ActionIcon>
            )}
          </Box>
          <form
            className="flex flex-col justify-start items-stretch gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              formik.submitForm();
            }}
          >
            <Textarea
              bg={theme.colorScheme === "dark" ? BG_DARK_COLOR : BG_LIGHT_COLOR}
              className="bg-transparent"
              placeholder="What do you think about this article?"
              error={formik.errors.text}
              {...formik.getFieldProps("text")}
            />
            <Button
              variant="light"
              type="submit"
              loading={addComment.isLoading || editComment.isLoading}
            >
              {_id ? "Update comment" : "Add comment"}
            </Button>
          </form>
          {!!!currentUser && (
            <>
              <Overlay
                zIndex={1}
                component="div"
                className="flex justify-center items-center w-full h-full"
                color={theme.colorScheme === "dark" ? "#000" : "#fff"}
                blur={1}
              ></Overlay>
              <Box className="flex z-10 flex-col items-center justify-center gap-2 absolute top-0 h-full w-full left-0 ">
                <Text size="lg" weight={700}>
                  You must be logged in to post a comment!
                </Text>
                <Text size="sm" weight={500}>
                  Please <Anchor onClick={reRoute(true)}>log in</Anchor> or{" "}
                  <Anchor onClick={reRoute(false)}>register</Anchor> to post a
                  comment.
                </Text>
              </Box>
            </>
          )}
        </Card>
        <Text color={theme.colorScheme === "light" ? "dimmed" : "blue"}>
          Will be posted now!
        </Text>
      </Box>
    </Box>
  );
}
