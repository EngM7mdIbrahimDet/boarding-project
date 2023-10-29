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
import { showNotification } from "@mantine/notifications";
import {
  useLoginUser,
  useRegisterUser,
} from "/imports/hooks/requests/Acccounts";

export default function RegisterPage() {
  const form = useForm({
    validate: zodResolver(
      z
        .object({
          name: z
            .string()
            .min(3, { message: "Name should be at least 3 characters!" }),
          email: z
            .string()
            .email({ message: "Please write a valid email!" })
            .min(3),
          password: z
            .string()
            .min(3, { message: "Password is invalid input!" })
            .max(50, { message: "Password is invalid input!" }),
          confirmPassword: z
            .string()
            .min(3, { message: "Password is invalid input!" }),
        })
        .refine((values) => values.password === values.confirmPassword, {
          message: "Passwords don't match!",
          path: ["confirmPassword"],
        })
    ),
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const goTo = useNavigate();
  const login = useLoginUser({
    onSuccess() {
      showNotification({
        title: "Hello!",
        message: "You have successfully registered!",
        color: "green",
      });
      goTo(ROUTES.ARTICLES);
    },
  });
  const register = useRegisterUser({
    onSuccess() {
      login.mutate({
        emails: [{ address: form.values.email }],
        password: form.values.password,
      });
    },
  });

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
            <Title order={4}>
              {" "}
              Want to create your own articles? Create an account!
            </Title>
            <form
              className="flex flex-col gap-3 justify-start items-stretch"
              onSubmit={form.onSubmit((values) => {
                register.mutate({
                  emails: [{ address: values.email }],
                  password: values.password,
                  profile: { name: values.name },
                  confirmPassword: values.confirmPassword,
                });
              })}
            >
              <TextInput
                required
                label="Name"
                description="Please tell us what is your name!"
                placeholder="Mohamed Ibrahim"
                {...form.getInputProps("name")}
              />
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
              <PasswordInput
                required
                label="Confirm Password"
                description="Please confirm password!"
                placeholder="X_X! Can't see it also!"
                {...form.getInputProps("confirmPassword")}
              />
              <Button
                loading={register.isLoading || login.isLoading}
                leftIcon={<IconLogin />}
                className="mt-0 self-center"
                variant="light"
                type="submit"
              >
                Register Now
              </Button>
            </form>
          </Flex>
          <Text className="w-full text-center">
            Already have an account now?{" "}
            <Anchor
              onClick={(e) => {
                e.preventDefault();
                goTo(ROUTES.LOG_IN);
              }}
              fw={500}
            >
              Login Now!
            </Anchor>
          </Text>
        </Card>
      </Center>
    </Page>
  );
}
