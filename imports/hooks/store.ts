import { ColorScheme } from "@mantine/core"
import { create } from "zustand";
import {persist} from "zustand/middleware";
 
type StoreType = {
    theme: ColorScheme;
    setTheme: (theme: ColorScheme) => void;
}

const useGlobalStore = create<StoreType>()(
    persist((set, get)=>({
        theme: "light",
        setTheme: (theme: ColorScheme) => set({theme})
    }), {name: "store"})
);

export default useGlobalStore;