import { useState } from "react";
import { Device, Device_data } from "./Device";
import { Device_selector, Config } from "./Device_selector";
import styles from "./App.module.css";
import default_config_json from "./assets/default_config.json";

function App() {
    const [config, setConfig] = useState<Config>(default_config_json);
    const [currentDevice, setCurrentDevice] = useState<Device_data | null>(
        null
    );

    // Placeholder for fileparser
    setConfig(default_config_json);

    // Function to handle button click
    const handleClick = (serialNumber: string) => {
        const device = config.devices.find(
            (device) => device.serial_number === serialNumber
        );
        if (device) {
            setCurrentDevice(device);
            //Log the device serial number
            console.log(`Device with serial number ${serialNumber} selected`);
        } else {
            console.error(
                `Device with serial number ${serialNumber} not found`
            );
        }
    };

    // Render current device
    return (
        <>
            <div>
                <Device_selector
                    devices_arr={config.devices}
                    selectionClick={handleClick}
                />
            </div>
            <div className={styles.deviceContainer}>
                {currentDevice && (
                    <Device
                        key={currentDevice.serial_number}
                        {...currentDevice}
                    />
                )}
            </div>
        </>
    );
}

export default App;
