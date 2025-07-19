import classNames from "classnames/bind";
import { RiLoader2Line } from "react-icons/ri";

import style from "./Login.module.scss";
import BoxInput from "../BoxInput";
import Button from "~/Components/Button";
import { useState } from "react";

const cx = classNames.bind(style);

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const isValid = username && password;
    const handleOnSubmit = () => {
        setIsLoading(true);
        // call api

        setIsLoading(false);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <BoxInput
                    id="username"
                    title="Username"
                    isCheck={false}
                    handleSetValue={setUsername}
                />
                <BoxInput
                    id="password"
                    title="Mật khẩu"
                    isPassword
                    handleSetValue={setPassword}
                />
                <button className={cx("btn_forget")}>Quên mật khẩu?</button>
            </div>
            <div className={cx("action")}>
                <Button
                    primary
                    large
                    disable={!isValid || isLoading}
                    className={cx("btn_submit")}
                    onClick={() => handleOnSubmit()}
                >
                    Đăng Nhập
                </Button>
                {isLoading && (
                    <span className={cx("loader")}>
                        <RiLoader2Line />
                    </span>
                )}
            </div>
        </div>
    );
}

export default Login;
