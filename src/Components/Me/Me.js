import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import style from "./Me.module.scss";
import Image from "~/Components/Image";

const cx = classNames.bind(style);
const MenuItemUser = [
    {
        key: "me",
        to: "/me",
        name: "Trang cá nhân",
    },
    {
        key: "waller",
        to: "/waller",
        name: "Lịch Sử Nạp Tiền",
    },
    {
        key: "payment",
        to: "/payment",
        name: "Lịch sử Mua Hàng",
    },
];
const MenuItemAdmin = [{}, {}];
const MenuItemPublic = [
    {
        key: "setting",
        to: "/setting",
        name: "Cài Đặt",
    },
    {
        key: "logout",
        name: "Đăng Xuất",
    },
];

function Me({ src, role }) {
    const [MenuItem, setMenuItem] = useState(MenuItemPublic);
    useEffect(() => {
        if (role) {
            if (role === "User") {
                setMenuItem((item) => [...item, ...MenuItemUser]);
            } else if (role === "Admin") {
                setMenuItem((item) => [...item, ...MenuItemAdmin]);
            }
        }
    }, [role]);
    return (
        <div className={cx("wrapper")}>
            <Image src={src} alt="Avatar user" />
        </div>
    );
}

Me.propTypes = {
    src: PropTypes.string,
    role: PropTypes.string,
};
export default Me;
