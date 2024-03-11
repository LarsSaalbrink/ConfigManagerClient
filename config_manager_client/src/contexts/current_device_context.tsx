import { Device_data } from "../components/Device";
import { createContext, Dispatch, SetStateAction } from "react";

export const current_device_context = createContext<{
    current_device: Device_data | null;
    setCurrentDevice: Dispatch<SetStateAction<Device_data | null>>;
} | null>(null);
