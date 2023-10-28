import {
  Anchor,
  Box,
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

export default function AddEditComment({ image }: AddEditCommentProps) {
  const theme = useMantineTheme();
  const goTo = useNavigate();
  const addComment = () => {};
  const currentUser = useCurrentUser();
  const formik = useFormik({
    validationSchema: Yup.object({
      text: Yup.string().required("You can't post an empty comment!"),
    }),
    initialValues: {
      text: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
          <Title order={4}>You</Title>
          <form onSubmit={formik.submitForm}>
            <Textarea
              bg={theme.colorScheme === "dark" ? BG_DARK_COLOR : BG_LIGHT_COLOR}
              className="bg-transparent"
              placeholder="What do you think about this article?"
              error={formik.errors.text}
              {...formik.getFieldProps("text")}
            />
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
