import { useState, useContext } from "react";
import styles from "./Device.module.css";
import { configOptionsLUT } from "../configs/options_LUT";
import { Trashbin } from "./Trashbin";
import { current_device_context } from "../contexts/current_device_context";
import { current_config_context } from "../contexts/config_context";
import MultiLayerTooltip from "./Btn_w_tooltips";
import { field_options } from "../configs/add_field";

export type Device_data = {
    serial_number: string;
    config: Record<string, any>;
};

type DeviceArgs = {
    device_json: Device_data;
    parent_handle_change_input: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    parent_handle_change_select: (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => void;
};
export function Device({
    device_json,
    parent_handle_change_input,
    parent_handle_change_select,
}: DeviceArgs) {
    // Shared current device state
    const device_context = useContext(current_device_context);
    if (!device_context) {
        throw new Error(
            "useContext was used outside of the current_device_context provider"
        );
    }
    const { current_device: _current_device, setCurrentDevice } =
        device_context;

    // Shared config state
    const config_state_context = useContext(current_config_context);
    if (!config_state_context) {
        throw new Error(
            "useContext was used outside of the config_context provider"
        );
    }
    const { config: _config, setConfig } = config_state_context;

    const [formData, set_Device_data] = useState<Device_data>(device_json);

    const handle_change_input = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number | boolean = e.target.value;

        // Handle checkboxes
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        // Handle numbers
        else if (!isNaN(Number(value))) {
            value = Number(value);
        }

        set_Device_data({
            ...formData,
            config: {
                ...formData.config,
                [e.target.name]: value,
            },
        });
        parent_handle_change_input(e); // TODO: Refactor this to use a context instead of calling parent
    };

    const handle_change_select = (e: React.ChangeEvent<HTMLSelectElement>) => {
        set_Device_data({
            ...formData,
            config: {
                ...formData.config,
                [e.target.name]: e.target.value,
            },
        });
        parent_handle_change_select(e); // TODO: Refactor this to use a context instead of calling parent
    };

    return (
        <div className={styles.device}>
            <div className={styles.delete_device_btn}>
                <Trashbin
                    input_func={() => {
                        setCurrentDevice(null); // Unselect the current device
                        // Delete it from the config
                        const newConfig = { ..._config };
                        newConfig.devices = newConfig.devices.filter(
                            (device) =>
                                device.serial_number !== formData.serial_number
                        );
                        setConfig(newConfig);
                    }}
                    key={formData.serial_number}
                />
            </div>
            <form>
                {Object.keys(formData.config).map((field) => {
                    const fieldType = typeof formData.config[field];
                    let inputType;

                    if (fieldType === "boolean") {
                        inputType = "checkbox";
                    } else if (fieldType === "number") {
                        inputType = "number";
                    }

                    return (
                        <div key={field} className={styles.device_field}>
                            <div className={styles.device_field__del_btn}>
                                <Trashbin
                                    input_func={() => {
                                        const newConfig = { ..._config };
                                        const device = newConfig.devices.find(
                                            (device) =>
                                                device.serial_number ===
                                                formData.serial_number
                                        );
                                        if (device) {
                                            delete device.config[field];
                                            setConfig(newConfig);
                                        } else {
                                            console.error(
                                                `Device with serial number ${formData.serial_number} not found`
                                            );
                                        }
                                    }}
                                    key={field}
                                />
                            </div>
                            <label>{field}</label>
                            {(() => {
                                if (inputType === "checkbox") {
                                    return (
                                        <input
                                            className={
                                                styles.device_field__del_btn_input
                                            }
                                            type={inputType}
                                            name={field}
                                            checked={
                                                formData.config[field] || false
                                            }
                                            onChange={handle_change_input}
                                        />
                                    );
                                } else if (inputType === "number") {
                                    return (
                                        <input
                                            className={
                                                styles.device_field__del_btn_input
                                            }
                                            type={inputType}
                                            name={field}
                                            value={formData.config[field] || ""}
                                            onChange={handle_change_input}
                                        />
                                    );
                                } else {
                                    // Select input
                                    return (
                                        <select
                                            className={
                                                styles.device_field__del_btn_input
                                            }
                                            name={field}
                                            value={formData.config[field] || ""}
                                            onChange={handle_change_select}
                                        >
                                            {configOptionsLUT
                                                .get(field)
                                                ?.map((option) => (
                                                    <option
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </option>
                                                ))}
                                        </select>
                                    );
                                }
                            })()}
                        </div>
                    );
                })}
            </form>
            <MultiLayerTooltip tooltips={field_options} />
        </div>
    );
}
