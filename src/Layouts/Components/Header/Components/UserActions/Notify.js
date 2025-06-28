import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { CiBellOn } from "react-icons/ci";
import { useEffect, useState } from "react";

import style from "./UserActions.module.scss";
import Menu from "~/Components/Wrapper/Menu";

const cx = classNames.bind(style);
function Notify({ count = 0 }) {
    const [countNotify, setCountNotify] = useState(count);
    const [isNotify, setIsNotify] = useState(false);
    const [resultNotify, setResultNotify] = useState([1, 2, 3, 4, 5]);

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
        setIsNotify(!isNotify);
    };
    return (
        <Menu
            hideOnClick={isNotify}
            small
            title="Thông Báo"
            items={resultNotify}
            onClickHide={setIsNotify}
        >
            <button
                onClick={() => handleHidden()}
                className={cx("wrapper_event")}
            >
                <div className={cx("count")}>{countNotify}</div>
                <span className={cx("icon")}>
                    <CiBellOn />
                </span>
            </button>
        </Menu>
    );
}

export default Notify;
