import { useState } from "react";
import styles from "./Device.module.css";

export type Device_data = {
    serial_number: string;
    config: Record<string, any>;
};

export function Device(device_json: Device_data) {
    const [formData, set_Device_data] = useState<Device_data>(device_json);

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_Device_data({
            ...formData,
            config: {
                ...formData.config,
                [e.target.name]: e.target.value,
            },
        });
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
                                onChange={handleFieldChange}
                            />
                        </div>
                    ))}
                </form>
            </div>
        </>
    );
}
