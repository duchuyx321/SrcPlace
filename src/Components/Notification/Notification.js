import classNames from "classnames/bind";
import PropTypes from "prop-types";
import {
    IoCloseOutline,
    IoInformationCircle,
    IoCheckmarkCircle,
} from "react-icons/io5";
import { PiWarningCircleFill } from "react-icons/pi";

import style from "./Notification.module.scss";

const cx = classNames.bind(style);
const MenuDefault = {
    info: {
        title: "Informational",
        leftIcon: <IoInformationCircle />,
    },
    success: {
        title: "Success ",
        leftIcon: <IoCheckmarkCircle />,
    },
    warning: {
        title: "Warning ",
        leftIcon: <PiWarningCircleFill />,
    },
    error: {
        title: "Error ",
        leftIcon: <PiWarningCircleFill />,
    },
};

function Notification({
    title = "",
    content = "",
    className = "",
    success = false,
    warning = false,
    error = false,
    info = false,
    leftIcon,
    rightIcon = <IoCloseOutline />,
}) {
    const classes = cx("wrapper", {
        [className]: className,
        success,
        warning,
        error,
        info,
    });
    return (
        <div className={classes}>
            <span className={cx("leftIcon")}>
                {MenuDefault["success"].leftIcon}
            </span>
            <div className={cx("title")}>
                <h3>{MenuDefault["success"].title}</h3>
                <p>Thanh Toán Thành Công</p>
            </div>
            <span className={cx("rightIcon")}>{rightIcon}</span>
        </div>
    );
}

export default Notification;
