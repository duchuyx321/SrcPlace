import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { BsFillCartFill } from "react-icons/bs";
import { useEffect, useState } from "react";

import style from "./UserActions.module.scss";
import Menu from "~/Components/Wrapper/Menu";

const cx = classNames.bind(style);
function Shopping({ count = 0 }) {
    const [isHidden, setIsHidden] = useState(false);
    const [countShopping, setCountShopping] = useState(count);
    const [resultShopping, setResultShopping] = useState([]);

    useEffect(() => {
        console.log("thêm count");
        setCountShopping(count);
    }, [count]);
    const handleHidden = () => {
        setIsHidden(!isHidden);
    };
    return (
        <Menu
            hideOnClick={isHidden}
            small
            title="Giỏ Hàng"
            items={resultShopping}
            onClickHide={setIsHidden}
            isImage
            isPrice
        >
            <button
                onClick={() => handleHidden()}
                className={cx("wrapper_event", { isHidden })}
            >
                {countShopping !== 0 && (
                    <div className={cx("count")}>{countShopping}</div>
                )}
                <span className={cx("icon")}>
                    <BsFillCartFill />
                </span>
            </button>
        </Menu>
    );
}

export default Shopping;
