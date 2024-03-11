import { useState } from "react";
import styles from "./Device.module.css";

export type Device_data = {
    serial_number: string;
    config: Record<string, any>;
};

type DeviceArgs = {
    device_json: Device_data;
    parent_handle_change: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export function Device({ device_json, parent_handle_change }: DeviceArgs) {
    const [formData, set_Device_data] = useState<Device_data>(device_json);

    const handle_field_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Device: handleFieldChange");
        set_Device_data({
            ...formData,
            config: {
                ...formData.config,
                [e.target.name]: e.target.value,
            },
        });
        parent_handle_change(e);
    };

    return (
        <>
            <div className={styles.deviceContainer}>
                <div>Serial Number: {formData.serial_number}</div>
                <form>
                    {Object.keys(formData.config).map((field) => (
                        <div key={field}>
                            <label>{field}</label>
                            <input
                                type="text"
                                name={field}
                                value={formData.config[field] || ""}
                                onChange={handle_field_change}
                            />
                        </div>
                    ))}
                </form>
            </div>
        </>
    );
}
