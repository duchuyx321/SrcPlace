import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { IoCartOutline } from "react-icons/io5";
import { CiShoppingCart, CiBellOn } from "react-icons/ci";
import { jwtDecode } from "jwt-decode";

import style from "./UserActions.module.scss";
import Me from "~/Components/Me";
import Button from "~/Components/Button";

const cx = classNames.bind(style);

function UserActions({}) {
    const role = "User";
    return (
        <div className={cx("wrapper")}>
            <button className={cx("wrapper_event")}>
                <div className={cx("count")}>1</div>
                <span className={cx("icon")}>
                    <CiBellOn />
                </span>
            </button>

            <button className={cx("wrapper_event")}>
                <div className={cx("count")}>999</div>
                <span className={cx("icon")}>
                    <CiShoppingCart />
                </span>
            </button>

            <Me role={role} />
        </div>
    );
}

export default UserActions;
