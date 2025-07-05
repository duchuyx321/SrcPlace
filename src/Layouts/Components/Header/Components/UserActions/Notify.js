import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { FaBell } from "react-icons/fa6";
import { useEffect, useState } from "react";

import style from "./UserActions.module.scss";
import Menu from "~/Components/Wrapper/Menu";

const cx = classNames.bind(style);
function Notify({ count = 0 }) {
    const [countNotify, setCountNotify] = useState(count);
    const [isHidden, setIsHidden] = useState(false);
    const [resultNotify, setResultNotify] = useState([]);

    useEffect(() => {
        console.log("thêm count");
        setCountNotify(count);
    }, [count]);

    useEffect(() => {
        console.log("call api");
        const accessToken = localStorage.getItem("AccessToken");
        if (accessToken && accessToken.startsWith("Bearer")) {
            // call api
        }
    }, [countNotify]);
    const handleHidden = () => {
        setIsHidden(!isHidden);
    };
    return (
        <Menu
            hideOnClick={isHidden}
            small
            title="Thông Báo"
            items={resultNotify}
            onClickHide={setIsHidden}
        >
            <button
                onClick={() => handleHidden()}
                className={cx("wrapper_event", { isHidden })}
            >
                <div className={cx("count")}>{countNotify}</div>
                <span className={cx("icon")}>
                    <FaBell />
                </span>
            </button>
        </Menu>
    );
}

export default Notify;
