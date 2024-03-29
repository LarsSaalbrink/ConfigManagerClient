import { useEffect, useState, createContext } from "react";
import { Device, Device_data } from "./components/Device";
import { Device_selector, Config } from "./components/Device_selector";
import { current_config_context } from "./contexts/config_context";
import { current_device_context } from "./contexts/current_device_context";
import { configOptionsLUT } from "./configs/options_LUT";
import styles from "./App.module.css";
import default_config_json from "./assets/default_config.json";
import logo from "../public/gobe_logo.webp";

export const AddFieldContext = createContext<
    (
        device: Device_data,
        type: string,
        field_name: string,
        options?: string[]
    ) => void
>(() => {});

function App() {
    const [config, setConfig] = useState<Config>(default_config_json);
    const [current_device, setCurrentDevice] = useState<Device_data | null>(
        null
    );

    useEffect(() => {
        setConfig(default_config_json);
    }, []);

    useEffect(() => {
        (window as any).current_device = current_device; // Should be callable by JS inlined in HTML
    }, [current_device]);

    useEffect(() => {}, [config]);

    // Update config from file
    const handle_file_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result;
                if (content) {
                    try {
                        const newConfig = JSON.parse(content as string);
                        setConfig(newConfig);
                    } catch (e) {
                        alert("Invalid JSON file");
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    // Export config to file
    const handle_export_config = () => {
        const data = JSON.stringify(config, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "updated_config.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    // Add a new parameter to specified device
    const add_field = (
        device: Device_data,
        type: string,
        field_name: string,
        options?: string[]
    ) => {
        const newConfig = { ...config };
        const device_index = newConfig.devices.findIndex(
            (d) => d.serial_number === device.serial_number
        );

        if (device_index !== -1) {
            const device = newConfig.devices[device_index];
            if (device) {
                if (device.config.hasOwnProperty(field_name)) {
                    alert(`Field ${field_name} already exists`);
                } else {
                    if (type === "selection" && options) {
                        device.config[field_name] = options[0];
                        configOptionsLUT.set(field_name, options); // Add options to LUT
                    } else if (type === "numeric") {
                        device.config[field_name] = 0;
                    } else if (type === "boolean") {
                        device.config[field_name] = false;
                    } else {
                        alert("Invalid type for new field");
                    }
                }
            }
        } else {
            console.error(
                `Device with serial number ${device.serial_number} not found`
            );
        }

        setConfig(newConfig);
    };
    (window as any).add_field = add_field; // Should be callable by JS inlined in HTML

    const handle_change_input = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <AddFieldContext.Provider value={add_field}>
            <current_device_context.Provider
                value={{ current_device, setCurrentDevice }}
            >
                <current_config_context.Provider value={{ config, setConfig }}>
                    <div className={styles.appContainer}>
                        <div className={styles.titleContainer}>
                            <div className={styles.title}>
                                <b>Config Manager</b>
                            </div>
                            <div className={styles.filepanel}>
                                <div className={styles.filebtn_container}>
                                    <input
                                        type="file"
                                        onChange={handle_file_change}
                                    />
                                </div>
                                <div className={styles.filebtn_container}>
                                    <input
                                        type="button"
                                        value="Export Config"
                                        onClick={handle_export_config}
                                    />
                                </div>
                            </div>
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
                                    parent_handle_change_input={
                                        handle_change_input
                                    }
                                    parent_handle_change_select={
                                        handle_change_select
                                    }
                                />
                            )}
                        </div>
                    </div>
                </current_config_context.Provider>
            </current_device_context.Provider>
        </AddFieldContext.Provider>
    );
}

export default App;
