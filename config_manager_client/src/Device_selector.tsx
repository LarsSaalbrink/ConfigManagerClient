import { useContext, useEffect } from "react";
import { Device_data } from "./Device";
import { config_context } from "./config_context";
import { current_device_context } from "./current_device_context";
import styles from "./Device_selector.module.css";

// Temporary placement, should be declared by fileparser
export type Config = {
    devices: Device_data[];
    diagnostics_server: string;
};

export function Device_selector() {
    // Shared config state
    const context = useContext(config_context);
    if (!context) {
        throw new Error(
            "useContext was used outside of the config_context provider"
        );
    }
    const { config, setConfig } = context;

    // Shared current device state
    const device_context = useContext(current_device_context);
    if (!device_context) {
        throw new Error(
            "useContext was used outside of the current_device_context provider"
        );
    }
    const { current_device: _current_device, setCurrentDevice } =
        device_context;

    // Update state when config changes
    useEffect(() => {
        setConfig(config);
    }, [config]);

    // Function to handle selection menu button click
    const handleClick = (serialNumber: string) => {
        console.log("App: handleClick");
        const device = config.devices.find(
            (device) => device.serial_number === serialNumber
        );
        if (device) {
            console.log("Device found");
            setConfig(config);
            setCurrentDevice(device);
        } else {
            console.error(
                `Device with serial number ${serialNumber} not found`
            );
        }
    };

    // Scrollable vertical container with row for each device serial number
    return (
        <div className={styles.deviceSelector}>
            <div className={styles.title}>
                <b>Devices</b>
            </div>
            {config.devices.map((device) => (
                <input
                    type="button"
                    value={device.serial_number}
                    key={device.serial_number}
                    onClick={() => {
                        handleClick(device.serial_number);
                    }}
                />
            ))}
            <input
                type="button"
                value="-New-"
                key="add_device"
                onClick={() => {
                    console.log("Add Device");
                    let number: any = null;

                    number = window.prompt("Serial number for new device");

                    if (number !== null) {
                        //check for duplicate serial number
                        if (
                            config.devices.find(
                                (device) => device.serial_number === number
                            )
                        ) {
                            window.alert("Serial number already exists");
                            number = null;
                        }
                        if (number < 0) {
                            window.alert("Serial number cannot be negative");
                            number = null;
                        }
                        if (isNaN(Number(number))) {
                            window.alert("Serial number must be a number");
                            number = null;
                        }
                    }

                    if (number !== null && number !== "") {
                        // Add new device to config
                        setConfig({
                            ...config,
                            devices: [
                                ...config.devices,
                                {
                                    serial_number: number,
                                    config: {},
                                },
                            ],
                        });
                    }
                }}
            />
        </div>
    );
}
