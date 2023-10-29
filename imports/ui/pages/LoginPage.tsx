import React, { useEffect } from "react";
import Page from "../layouts/Page";
import BackgroundImage from "../components/BackgroundImage";
import {
  Anchor,
  Button,
  Card,
  Center,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { FULL_SCREEN } from "/imports/constants/styles";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { IconLogin } from "@tabler/icons";
import { ROUTES } from "/imports/routes/routes";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "/imports/hooks/requests/Acccounts";
import { showNotification } from "@mantine/notifications";

export default function LoginPage() {
  const form = useForm({
    validate: zodResolver(
      z.object({
        email: z
          .string()
          .email({ message: "Please write a valid email!" })
          .min(3),
        password: z
          .string()
          .min(3, { message: "Password is invalid input!" })
          .max(50, { message: "Password is invalid input!" }),
      })
    ),
    initialValues: {
      email: "",
      password: "",
    },
  });
  const goTo = useNavigate();
  const login = useLoginUser({
    onSuccess(_) {
      showNotification({
        title: "Welcome back!",
        message: "You have successfully logged in!",
        color: "green",
      });
      goTo(ROUTES.ARTICLES);
    },
  });

  const handleSubmit = () => {
    return form.onSubmit((values) => {
      login.mutate({
        emails: [{ address: values.email }],
        password: values.password,
      });
    });
  };
  return (
    <Page className="relative">
      <BackgroundImage />
      <Center style={{ height: FULL_SCREEN }} className="w-full ">
        <Card
          style={{ minHeight: "50%" }}
          className="w-1/2"
          withBorder
          shadow="md"
        >
          <Flex p="md" className="w-full justify-start flex-col flex gap-10">
            <Title className="self-center" order={1}>
              {" "}
              Welcome to the articles app !
            </Title>
            <Title order={4}> Please login to start creating articles</Title>
            <form
              className="flex flex-col gap-3 justify-start items-stretch"
              onSubmit={handleSubmit()}
            >
              <TextInput
                required
                label="Email"
                description="Please write your account's email!"
                placeholder="example@gmail.com"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                required
                label="Password"
                description="Please write your account's password!"
                placeholder="X_X! Can't see it!"
                {...form.getInputProps("password")}
              />
              <Button
                loading={login.isLoading}
                leftIcon={<IconLogin />}
                className="mt-0 self-center"
                variant="light"
                type="submit"
              >
                Log in
              </Button>
            </form>
          </Flex>
          <Text className="w-full text-center">
            Don't you have an account now?{" "}
            <Anchor
              onClick={(e) => {
                e.preventDefault();
                goTo(ROUTES.REGISTER);
              }}
              fw={500}
            >
              Register Now!
            </Anchor>
          </Text>
        </Card>
      </Center>
    </Page>
  );
}
