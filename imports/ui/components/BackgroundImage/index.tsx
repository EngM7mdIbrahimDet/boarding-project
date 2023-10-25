import { Image, useMantineTheme } from "@mantine/core";
import React from "react";

export default function BackgroundImage() {
  const theme = useMantineTheme();
  return (
    <Image
        className="absolute bottom-0 left-0 w-full object-fill"
      src={`bg-${theme.colorScheme}.svg`}
    />
  );
}
