import { Config } from "./Device_selector";
import { createContext, Dispatch, SetStateAction } from "react";

export const config_context = createContext<{
    config: Config;
    setConfig: Dispatch<SetStateAction<Config>>;
} | null>(null);
