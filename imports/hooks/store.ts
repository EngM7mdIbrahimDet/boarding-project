import {
  ColorScheme,
  DEFAULT_THEME,
  MantineTheme,
} from "@mantine/core";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreType = {
  theme: MantineTheme;
  setTheme: (theme: ColorScheme) => void;
};

const useGlobalStore = create<StoreType>()(
  persist(
    (set, get) => ({
      theme: { ...DEFAULT_THEME, colorScheme: "light" },
      setTheme: (colorScheme: ColorScheme) =>
        set({ theme: { ...DEFAULT_THEME, colorScheme } }),
    }),
    { name: "store" }
  )
);

export default useGlobalStore;
