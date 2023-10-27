import React, { useEffect } from "react";
import { Box, Card, Image, Title } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons";
import { ACCENT_COLOUR } from "/imports/constants/styles";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "/imports/routes/routes";
import useCurrentUser from "/imports/hooks/current-user";
import { ArticleAddImageProps } from "/imports/types/ui/components/Article/ArticleAddImageProps";

const ArticleAddImage = ({ isLoggedIn }: ArticleAddImageProps) => {
  return (
    <Box mb="lg" className="relative h-60 w-60 self-center">
      <Image
        className="w-full h-full"
        src={isLoggedIn ? "/blog.png" : "/login.png"}
        fit="contain"
      />
      <IconCirclePlus
        fill={ACCENT_COLOUR}
        size={80}
        className="absolute -right-3 -bottom-3"
      />
    </Box>
  );
};
export default function AddArticlePreview() {
  const goTo = useNavigate();
  const currentUser = useCurrentUser();
  useEffect(() => {
    console.log("Add Article ", Boolean(currentUser));
  });
  return (
    <Card
      style={{ minHeight: "400px" }}
      className="w-2/5 flex flex-col justify-center items-center hover:cursor-pointer hover:animate-pulse"
      withBorder
      shadow="xl"
      onClick={() => {
        goTo(currentUser ? ROUTES.ADD_ARTICLE : ROUTES.LOG_IN);
      }}
    >
      <ArticleAddImage isLoggedIn={Boolean(currentUser)} />
      <Title align="center" order={3}>
        {currentUser
          ? "Want to add yours ? Click here!"
          : "Want to add yours ? Log in!"}
      </Title>
    </Card>
  );
}
