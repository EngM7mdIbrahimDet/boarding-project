import { Box, Stack } from "@mantine/core";
import React from "react";

export default function Page({
  children,
  stack = false,
  className
}: {
  children: React.ReactNode;
  stack?: boolean;
  className?: string;
}) {
  return stack ? (
    <Stack
      style={{ minHeight: "calc(100vh - 90px)" }}
      className={`w-full h-full ${className}`}
    >
      {children}
    </Stack>
  ) : (
    <Box style={{ minHeight: "calc(100vh - 90px)" }} className={`w-full h-full flex ${className}`}>
      {children}
    </Box>
  );
}
