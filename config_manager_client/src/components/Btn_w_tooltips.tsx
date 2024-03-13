import React, { useState } from "react";
import styles from "./Btn_w_tooltips.module.css";

export type TooltipProps = {
    tooltip: {
        text: string;
        children: TooltipProps[];
    };
    level?: number;
};

const Tooltip: React.FC<TooltipProps & { visible: boolean }> = ({
    tooltip,
    visible,
    level = 0,
}) => {
    const [childVisible, setChildVisible] = useState(false);

    const handleMouseEnter = () => {
        setChildVisible(true);
    };

    const handleMouseLeave = () => {
        setChildVisible(false);
    };

    return (
        <div
            className={`${styles.tooltip} ${visible ? styles.visible : ""}`}
            style={{ left: level === 0 ? "0px" : "104px" }}
        >
            {" "}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {tooltip.children.map((child, index) => (
                    <Tooltip
                        key={index}
                        tooltip={child.tooltip}
                        visible={childVisible}
                        level={level + 1}
                    />
                ))}
            </div>
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                dangerouslySetInnerHTML={{ __html: tooltip.text }}
            />
        </div>
    );
};

type MultiLayerTooltipProps = {
    tooltips: TooltipProps[];
};
const MultiLayerTooltip: React.FC<MultiLayerTooltipProps> = ({ tooltips }) => {
    const [visible, setVisible] = useState(false);

    const handleMouseEnter = () => {
        setVisible(true);
    };

    const handleMouseLeave = () => {
        setVisible(false);
    };

    return (
        <div
            className={styles.field_btn_container}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className={styles.add_field_btn}
                onMouseEnter={handleMouseEnter}
            >
                +
            </button>
            <div className={styles.tooltip_container}>
                {tooltips.map((tooltip, index) => (
                    <Tooltip
                        key={index}
                        tooltip={tooltip.tooltip}
                        visible={visible}
                        level={0}
                    />
                ))}
            </div>
        </div>
    );
};
export default MultiLayerTooltip;
