import { useEffect, useState } from "react";
import { Device, Device_data } from "./components/Device";
import { Device_selector, Config } from "./components/Device_selector";
import { current_config_context } from "./contexts/config_context";
import { current_device_context } from "./contexts/current_device_context";
import styles from "./App.module.css";
import default_config_json from "./assets/default_config.json";
import logo from "../public/gobe_logo.webp";

function App() {
    const [config, setConfig] = useState<Config>(default_config_json);
    const [current_device, setCurrentDevice] = useState<Device_data | null>(
        null
    );

    useEffect(() => {
        //On load
        setConfig(default_config_json); // Placeholder for fileparser
    }, []);

    useEffect(() => {
        console.log("current_device updated");
    }, [current_device]);

    useEffect(() => {
        console.log("Config updated");
    }, [config]);

    const handle_change_input = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("App: handleFieldChange");

        // Update the config with the new value
        const newConfig = { ...config };
        const device = newConfig.devices.find(
            (device) => device.serial_number === current_device?.serial_number
        );

        if (device) {
            let value: string | number | boolean = e.target.value;

            // Handle checkboxes
            if (e.target.type === "checkbox") {
                value = e.target.checked;
            }
            // Handle numbers
            else if (!isNaN(Number(value))) {
                value = Number(value);
            }

            device.config[e.target.name] = value;
            setConfig(newConfig);
        } else {
            console.error(
                `Device with serial number ${current_device?.serial_number} not found`
            );
        }
    };

    const handle_change_select = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("App: handleFieldChange");

        // Update the config with the new value
        const newConfig = { ...config };
        const device = newConfig.devices.find(
            (device) => device.serial_number === current_device?.serial_number
        );
        if (device) {
            device.config[e.target.name] = e.target.value;
            setConfig(newConfig);
        } else {
            console.error(
                `Device with serial number ${current_device?.serial_number} not found`
            );
        }
    };

    // Render current device
    return (
        <current_device_context.Provider
            value={{ current_device, setCurrentDevice }}
        >
            <current_config_context.Provider value={{ config, setConfig }}>
                <div className={styles.appContainer}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>
                            <b>Config Manager</b>
                        </div>
                        <div className={styles.serverpanel}></div>
                        <div className={styles.logobox}>
                            <img src={logo}></img>
                        </div>
                    </div>

                    <div className={styles.selectorContainer}>
                        <Device_selector />
                    </div>

                    <div className={styles.deviceContainer}>
                        {current_device && (
                            <Device
                                key={current_device.serial_number}
                                device_json={current_device}
                                parent_handle_change_input={handle_change_input}
                                parent_handle_change_select={
                                    handle_change_select
                                }
                            />
                        )}
                    </div>
                </div>
            </current_config_context.Provider>
        </current_device_context.Provider>
    );
}

export default App;
