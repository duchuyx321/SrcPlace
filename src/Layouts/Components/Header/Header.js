import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

import style from "./Header.module.scss";
import Image from "~/Components/Image";
import image from "~/Assets/Image";
import Button from "~/Components/Button";
import UserActions from "~/Layouts/Components/Header/Components/UserActions";

const cx = classNames.bind(style);
function Header() {
    const [isLogin, setIsLogin] = useState(true);
    useEffect(() => {
        const AccessToken = localStorage.getItem("AccessToken");
        // setIsLogin(!!AccessToken);
    }, []);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("left")}>
                <Image
                    className={cx("logo")}
                    src={image.logoBlackImage}
                    alt="Logo SrcPlace"
                />
                <h3>Thư Viện Đồ Án</h3>
            </div>
            <div className={cx("center")}>
                <div className={cx("search")}>
                    <label htmlFor="search">
                        <input
                            id="search"
                            type="text"
                            placeholder="Nhập từ khóa tìm kiếm"
                        />
                    </label>
                    <Button primary className={cx("btn_search")} small>
                        <IoIosSearch />
                    </Button>
                </div>
            </div>
            <div className={cx("right")}>
                {isLogin ? (
                    <UserActions />
                ) : (
                    <>
                        <Button className={cx("btn_login")} primary>
                            Đăng nhập
                        </Button>
                        <Button className={cx("btn_register")} primary>
                            Đăng kí
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
