import bin_icon from "../../public/trash_icon.png";
import styles from "./Trashbin.module.css";

type TrashbinArgs = {
    input_func: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};
export function Trashbin({ input_func }: TrashbinArgs) {
    return (
        <input
            type="image"
            src={bin_icon}
            alt="Trash bin"
            className={styles.trashbin_container}
            onClick={(event) => {
                event.preventDefault();
                input_func(event);
            }}
        />
    );
}
