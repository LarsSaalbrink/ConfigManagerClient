import { useState } from "react";
import { useEffect } from "react";
import { Device, Device_data } from "./Device";
import styles from "./App.module.css";
import default_config_json from "./assets/default_config.json";

function App() {
    const [devices, setDevices] = useState<Device_data[]>([]);
    const [currentDevice, setCurrentDevice] = useState<Device_data | null>(
        null
    );

    useEffect(() => {
        // Hook to run once on component mount
        setDevices(default_config_json.devices);
    }, []);

    // Set current device to index 0
    useEffect(() => {
        setCurrentDevice(devices[0]);
    }, [devices]);

    // Render current device
    return (
        <>
            <div className={styles.deviceContainer}>
                {currentDevice && <Device {...currentDevice} />}
            </div>
        </>
    );
}

export default App;
