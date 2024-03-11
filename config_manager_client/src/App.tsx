import { useEffect, useState } from "react";
import { Device, Device_data } from "./Device";
import { Device_selector, Config } from "./Device_selector";
import styles from "./App.module.css";
import default_config_json from "./assets/default_config.json";

function App() {
    const [config, setConfig] = useState<Config>(default_config_json);
    const [currentDevice, setCurrentDevice] = useState<Device_data | null>(
        null
    );

    useEffect(() => {
        //On load
        setConfig(default_config_json); // Placeholder for fileparser
    }, []);

    useEffect(() => {
        console.log("currentDevice updated");
    }, [currentDevice]);

    useEffect(() => {
        console.log("Config updated");
    }, [config]);

    // Function to handle selection menu button click
    const handleClick = (serialNumber: string) => {
        console.log("App: handleClick");

        const device = config.devices.find(
            (device) => device.serial_number === serialNumber
        );
        if (device) {
            setCurrentDevice(device);
            console.log(`Device with serial number ${serialNumber} selected`);
        } else {
            console.error(
                `Device with serial number ${serialNumber} not found`
            );
        }
    };

    const handle_field_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("App: handleFieldChange");

        // Update the config with the new value
        const newConfig = { ...config };
        const device = newConfig.devices.find(
            (device) => device.serial_number === currentDevice?.serial_number
        );
        if (device) {
            device.config[e.target.name] = e.target.value;
            setConfig(newConfig);
        } else {
            console.error(
                `Device with serial number ${currentDevice?.serial_number} not found`
            );
        }
    };

    // Render current device
    return (
        <>
            <div>
                <Device_selector
                    devices_arr={config.devices}
                    parent_handle_selectionClick={handleClick}
                />
            </div>
            <div className={styles.deviceContainer}>
                {currentDevice && (
                    <Device
                        key={currentDevice.serial_number}
                        device_json={currentDevice}
                        parent_handle_change={handle_field_change}
                    />
                )}
            </div>
        </>
    );
}

export default App;
