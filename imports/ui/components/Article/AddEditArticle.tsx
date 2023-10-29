import React from "react";
import { AddEditArticleProps } from "/imports/types/ui/components/Article/AddEditArticleProps";
import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { AddEditArticleHeaderProps } from "/imports/types/ui/components/Article/AddEditArticleHeaderProps";
import { useFormik } from "formik";
import { IArticle } from "/imports/types/models/Article";
import * as Yup from "yup";
import timeAgo from "/imports/utils/date-formatter";
import {
  useAddArticle,
  useUpdateArticle,
} from "/imports/hooks/requests/Articles";
import { useQueryClient } from "react-query";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "/imports/routes/routes";

const AddEditArticleHeader = ({
  inputProps,
  image,
  isLoading
}: AddEditArticleHeaderProps) => {
  return (
    <Flex gap={10} justify="start" align="center">
      <Image src={image} height={40} width={40} fit="contain" />
      <Box className=" flex flex-col py-5 justify-start items-start flex-1">
        <TextInput
        disabled={isLoading}
          className="self-stretch"
          placeholder="What will be the article's title?"
          error={inputProps.error}
          {...inputProps.props}
        />
        <Text fw={500}>You</Text>
      </Box>
    </Flex>
  );
};

export default function AddEditArticle({
  _id,
  title,
  text,
  timeline,
  image,
}: AddEditArticleProps) {
  const queryClient = useQueryClient();
  const goTo = useNavigate();
  const addArticle = useAddArticle({
    onSuccess() {
      showNotification({
        title: "Success!",
        message: "Article has been added!",
        color: "green",
      });
      queryClient.invalidateQueries("getArticles");
      queryClient.invalidateQueries("getMyArticles");
      goTo(ROUTES.ARTICLES);
    },
  });
  const updateArticle = useUpdateArticle(_id ?? "", {
    onSuccess() {
      showNotification({
        title: "Success!",
        message: "Article has been updated!",
        color: "green",
      });
      queryClient.invalidateQueries("getArticles");
      queryClient.invalidateQueries("getMyArticles");
      goTo(-1);
    },
  });

  const form = useFormik<IArticle>({
    initialValues: {
      _id,
      title: title || "",
      text: text || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Article's title is required"),
      text: Yup.string().required("Article's text is required"),
    }),
    onSubmit: (values) => {
      if (_id) {
        updateArticle.mutate(values);
      } else {
        addArticle.mutate(values);
      }
    },
  });
  const theme = useMantineTheme();
  return (
    <Card
      style={{ minHeight: "400px" }}
      className="w-2/5 flex flex-col"
      withBorder
      shadow="xl"
    >
      <form
        className="h-full flex flex-col flex-1 gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          form.submitForm();
        }}
      >
        <AddEditArticleHeader
          image={image}
          isLoading={addArticle.isLoading || updateArticle.isLoading}
          inputProps={{
            props: form.getFieldProps("title"),
            error: form.getFieldMeta("title").error,
          }}
        />
        <Box className="flex-1 self-stretch justify-center">
          <Textarea
            className="flex-1 border-none"
            placeholder="What is on your mind?"
            autosize
            disabled={addArticle.isLoading || updateArticle.isLoading}
            minRows={15}
            maxRows={4}
            error={form.getFieldMeta("text").error}
            {...form.getFieldProps("text")}
          />
        </Box>
        <Text color={theme.colorScheme === "light" ? "dimmed" : "blue"}>
          {_id
            ? (!timeline?.isEdit ? "Posted " : "Last Edited ") +
              timeAgo(timeline?.date ?? Date.now())
            : "Will be posted now!"}
        </Text>
        <Button
          loading={addArticle.isLoading || updateArticle.isLoading}
          type="submit"
          variant="light"
          fullWidth
        >
          {_id ? "Update Article" : "Add Article"}
        </Button>
      </form>
    </Card>
  );
}
