import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import classNames from "classnames/bind";
import { CiShoppingCart, CiBellOn } from "react-icons/ci";
import { use, useState } from "react";

import style from "./UserActions.module.scss";
import Me from "~/Components/Me";
import Menu from "~/Components/Wrapper/Menu";

const cx = classNames.bind(style);

const LIST_ACTION = [
    {
        key: "shopping",
        icon: <CiShoppingCart />,
        title: "Giỏ Hàng",
    },
    {
        key: "notify",
        icon: <CiBellOn />,
        title: "Thông Báo",
    },
];

const MENU_ITEMS = [{}];

function UserActions({}) {
    const role = "User";
    const [isShopping, setIsShopping] = useState(false);
    const [countShopping, setCountShopping] = useState(999);
    const [resultShopping, setResultShopping] = useState([1, 2, 3]);

    const [countNotify, setCountNotify] = useState(100);
    const [isNotify, setIsNotify] = useState(false);
    const [resultNotify, setResultNotify] = useState([1, 2, 3, 4, 5]);

    const resultCount = (key) => {
        if (key === "shopping") return countShopping;
        else if (key === "notify") return countNotify;
    };
    const resultIsHidden = (key) => {
        if (key === "shopping") return isShopping;
        else if (key === "notify") return isNotify;
    };
    const resultItems = (key) => {
        if (key === "shopping") return resultShopping;
        else if (key === "notify") return resultNotify;
    };
    const handleHidden = (key) => {
        console.log(key);
        if (key === "shopping") {
            // call api ở đây luôn
            setIsNotify(false);
            return setIsShopping(!isShopping);
        } else if (key === "notify") {
            // call thêm api ở đây
            setIsShopping(false);
            return setIsNotify(!isNotify);
        }
    };
    return (
        <div className={cx("wrapper")}>
            {LIST_ACTION.map((item) => (
                <Menu
                    hideOnClick={resultIsHidden(item.key)}
                    small
                    key={item.key}
                    title={item.title}
                    items={resultItems(item.key)}
                >
                    <button
                        onClick={() => handleHidden(item.key)}
                        className={cx("wrapper_event")}
                    >
                        <div className={cx("count")}>
                            {resultCount(item.key)}
                        </div>
                        <span className={cx("icon")}>{item.icon}</span>
                    </button>
                </Menu>
            ))}

            <Me role={role} />
        </div>
    );
}

export default UserActions;
