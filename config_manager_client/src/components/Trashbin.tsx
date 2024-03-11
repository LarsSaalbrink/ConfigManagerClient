import bin_icon from "../../public/trash_icon.png";
import styles from "./Trashbin.module.css";

export function Trashbin(input_func: () => void) {
    return (
        <input
            type="image"
            src={bin_icon}
            alt="Trash bin"
            className={styles.trashbin_container}
            onClick={input_func}
        />
    );
}
