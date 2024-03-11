import { useState } from "react";
import { useEffect } from "react";
import { Device, Device_data } from "./Device";
import styles from "./App.module.css";
import default_config_json from "./assets/default_config.json";

function App() {
    const [devices, setDevices] = useState<Device_data[]>([]);

    useEffect(() => {
        // Hook to run once on component mount
        setDevices(default_config_json.devices);
    }, []);

    // Render devices
    return (
        <div className={styles.appContainer}>
            {[...Array(devices.length)].map((_, i) => (
                <Device key={i} {...devices[i]} />
            ))}
        </div>
    );
}

export default App;
