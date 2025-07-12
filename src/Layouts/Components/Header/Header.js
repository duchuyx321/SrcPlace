import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import style from "./Header.module.scss";
import Image from "~/Components/Image";
import image from "~/Assets/images";
import Button from "~/Components/Button";
import UserActions from "~/Layouts/Components/Header/Components/UserActions";
import Me from "~/Components/Me";
import Search from "~/Components/Search";
import { Link } from "react-router-dom";
import config from "~/Config";

const cx = classNames.bind(style);
function Header({ is_searchHeader = true }) {
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        const AccessToken = localStorage.getItem("AccessToken");
        // setIsLogin(!!AccessToken);
    }, []);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("left")}>
                <Link to={config.routers.home} className={cx("comeHome")}>
                    <Image
                        className={cx("logo")}
                        src={image.logoWhiteImage}
                        alt="Logo SrcPlace"
                    />
                    <h3>Thư Viện Đồ Án</h3>
                </Link>
            </div>
            {is_searchHeader && <Search />}
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
