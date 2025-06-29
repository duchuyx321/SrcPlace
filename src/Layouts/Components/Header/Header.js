import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import style from "./Header.module.scss";
import Image from "~/Components/Image";
import image from "~/Assets/Image";
import Button from "~/Components/Button";
import UserActions from "~/Layouts/Components/Header/Components/UserActions";
import Search from "./Components/Search/Search";
import Me from "~/Components/Me";

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
            <Search />
            <div className={cx("right")}>
                {isLogin ? (
                    <div className={cx("right_wrapper")}>
                        <UserActions />
                        <Me />
                    </div>
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
