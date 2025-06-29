/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import { BsWallet2 } from "react-icons/bs";
import { IoCashOutline, IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { CiShoppingBasket } from "react-icons/ci";
import { useMemo, useState } from "react";
import { formatNumberPrice } from "~/Util/lib/formatNumberPrice";

import style from "./Me.module.scss";
import Image from "~/Components/Image";
import Menu from "~/Components/Wrapper/Menu";
import Button from "~/Components/Button";

const cx = classNames.bind(style);
const MenuItemUser = [
    {
        key: "wallet",
        to: "/wallet",
        name: "Lịch Sử Nạp Tiền",
        icon: <IoCashOutline />,
    },
    {
        key: "payment",
        to: "/payment",
        name: "Lịch sử Mua Hàng",
        icon: <CiShoppingBasket />,
    },
];
const MenuItemAdmin = [{}, {}];
const MenuItemPublic = [
    {
        key: "setting",
        to: "/setting",
        name: "Cài Đặt",
        icon: <IoSettingsOutline />,
    },
    {
        key: "logout",
        name: "Đăng Xuất",
        icon: <IoIosLogOut />,
    },
];

function Me() {
    let role = "User";
    const [isHide, setIsHide] = useState(false);
    const MenuItem = useMemo(() => {
        if (role) {
            if (role === "User") {
                return [...MenuItemUser, ...MenuItemPublic];
            } else if (role === "Admin") {
                return [...MenuItemAdmin, ...MenuItemPublic];
            }
        }
    }, []);
    const customHeader = () => {
        return (
            <Button to="/me" className={cx("wrapper_header")}>
                <div className={cx("header")}>
                    <span className={cx("avatar")}>
                        <Image />
                        <h3>Đức Huy</h3>
                    </span>
                    <div className={cx("wallet")}>
                        <span className={cx("wallet_title")}>
                            <BsWallet2 />
                            <p>Ví Tiền</p>
                        </span>
                        <span className={cx("wallet_price")}>
                            {formatNumberPrice({ number: 1000000000 })}
                        </span>
                    </div>
                </div>
            </Button>
        );
    };

    const handleOnHide = () => {
        setIsHide(!isHide);
    };
    const handleOnChange = (item) => {
        const innerText = item.target.innerText;
        switch (innerText) {
            case "Đăng Xuất":
                console.log(true);
                return;
            default:
                return;
        }
    };
    return (
        <Menu
            onClickHide={setIsHide}
            hideOnClick={isHide}
            items={MenuItem}
            CustomHeader={customHeader()}
            onChange={handleOnChange}
            isArrow={false}
        >
            <button className={cx("wrapper")} onClick={() => handleOnHide()}>
                <Image src={""} alt="Avatar user" />
            </button>
        </Menu>
    );
}

export default Me;
