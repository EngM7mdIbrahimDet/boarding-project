import { Box, Stack } from "@mantine/core";
import React from "react";

export default function Page({
  children,
  stack,
}: {
  children: React.ReactNode;
  stack: boolean;
}) {
  return stack ? (
    <Stack className="w-full h-full ">{children}</Stack>
  ) : (
    <Box className="w-full h-full flex border-2 border-purple-700">{children}</Box>
  );
}
