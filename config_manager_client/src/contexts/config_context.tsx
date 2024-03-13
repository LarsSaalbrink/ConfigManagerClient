import { Config } from "../components/Device_selector";
import { createContext, Dispatch, SetStateAction } from "react";

export const current_config_context = createContext<{
    config: Config;
    setConfig: Dispatch<SetStateAction<Config>>;
} | null>(null);
