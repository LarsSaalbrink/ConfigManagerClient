import { useState } from "react";
import { useEffect } from "react";
import { Device_data } from "./Device";
import styles from "./Device_selector.module.css";

// Temporary placement, should be declared by fileparser
export type Config = {
    devices: Device_data[];
    diagnostics_server: string;
};

type DeviceSelectorArgs = {
    devices_arr: Device_data[];
    selectionClick: (serialNumber: string) => void;
};
export function Device_selector({
    devices_arr,
    selectionClick,
}: DeviceSelectorArgs) {
    // State containing all devices
    const [devices, setDevices] = useState<Device_data[]>(devices_arr);

    // Update state when devices_arr changes
    useEffect(() => {
        setDevices(devices_arr);
    }, [devices_arr]);

    // Scrollable vertical container with row for each device serial number
    return (
        <div className={styles.deviceSelector}>
            {devices.map((device) => (
                <input
                    type="button"
                    value={device.serial_number}
                    key={device.serial_number}
                    onClick={() => {
                        selectionClick(device.serial_number);
                    }}
                />
            ))}
        </div>
    );
}
