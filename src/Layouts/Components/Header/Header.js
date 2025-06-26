import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

import style from "./Header.module.scss";
import Image from "~/Components/Image";
import image from "~/Assets/Image";
import Button from "~/Components/Button";

const cx = classNames.bind(style);
function Header() {
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        const AccessToken = localStorage.getItem("AccessToken");
        setIsLogin(!!AccessToken);
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
                    <Button primary small leftIcon={<IoIosSearch />}>
                        {""}
                    </Button>
                </div>
            </div>
            <div className={cx("right")}>
                {isLogin ? (
                    ""
                ) : (
                    <>
                        <Button outline>Đăng nhập</Button>
                        <Button outline>Đăng kí</Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
