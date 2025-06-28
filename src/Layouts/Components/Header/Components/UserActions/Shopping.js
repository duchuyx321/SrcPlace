import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { CiShoppingCart } from "react-icons/ci";
import { useState } from "react";

import style from "./UserActions.module.scss";
import Menu from "~/Components/Wrapper/Menu";

const cx = classNames.bind(style);
function Shopping() {
    const [isShopping, setIsShopping] = useState(false);
    const [countShopping, setCountShopping] = useState(100);
    const [resultShopping, setResultShopping] = useState([1, 2, 3, 4, 5]);

    const handleHidden = () => {
        setIsShopping(!isShopping);
    };
    return (
        <Menu
            hideOnClick={isShopping}
            small
            title="Giỏ Hàng"
            items={resultShopping}
            onClickHide={setIsShopping}
            isImage
            isPrice
        >
            <button
                onClick={() => handleHidden()}
                className={cx("wrapper_event")}
            >
                <div className={cx("count")}>{countShopping}</div>
                <span className={cx("icon")}>
                    <CiShoppingCart />
                </span>
            </button>
        </Menu>
    );
}

export default Shopping;
