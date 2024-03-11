import { useState } from "react";
import styles from "./Device.module.css";
import { configOptionsLUT } from "../options_LUT.tsx";

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
    const [formData, set_Device_data] = useState<Device_data>(device_json);

    const handle_change_input = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Device: handleFieldChange");

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
        parent_handle_change_input(e);
    };

    const handle_change_select = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("Device: handleFieldChange");
        set_Device_data({
            ...formData,
            config: {
                ...formData.config,
                [e.target.name]: e.target.value,
            },
        });
        parent_handle_change_select(e);
    };

    return (
        <>
            <div className={styles.deviceContainer}>
                <div>Serial Number: {formData.serial_number}</div>
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
                            <div key={field}>
                                <label>{field}</label>
                                {(() => {
                                    if (inputType === "checkbox") {
                                        return (
                                            <input
                                                type={inputType}
                                                name={field}
                                                checked={
                                                    formData.config[field] ||
                                                    false
                                                }
                                                onChange={handle_change_input}
                                            />
                                        );
                                    } else if (inputType === "number") {
                                        return (
                                            <input
                                                type={inputType}
                                                name={field}
                                                value={
                                                    formData.config[field] || ""
                                                }
                                                onChange={handle_change_input}
                                            />
                                        );
                                    } else {
                                        // Select input
                                        return (
                                            <select
                                                name={field}
                                                value={
                                                    formData.config[field] || ""
                                                }
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
            </div>
        </>
    );
}
