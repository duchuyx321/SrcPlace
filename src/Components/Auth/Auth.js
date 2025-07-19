import classNames from "classnames/bind";
import { TiDelete } from "react-icons/ti";

import style from "./Auth.module.scss";
import Other from "./components/Other";
import Login from "./components/Login";

const cx = classNames.bind(style);
function Auth() {
    const handleOnClose = () => {
        console.log("close");
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <button
                    className={cx("btn_close")}
                    onClick={() => handleOnClose()}
                >
                    <TiDelete />
                </button>
                <div className={cx("center")}>
                    <div className={cx("title")}>
                        <h3>Đăng Nhập Vào SrcPlace</h3>
                    </div>
                    <div className={cx("content")}>
                        <Login />
                    </div>
                </div>
                <div className={cx("convert")}>
                    <div>
                        <p>Bạn chưa có tài khoản?</p>
                        <button className={cx("btn_convert")}>Đăng kí</button>
                    </div>
                </div>
                <div className={cx("footer")}>
                    <Other />
                </div>
            </div>
        </div>
    );
}

export default Auth;
