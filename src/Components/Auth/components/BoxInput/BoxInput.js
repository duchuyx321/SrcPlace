import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import style from "./BoxInput.module.scss";
import { addToast } from "~/Features/Toast/toastSlice";
import { useDebounce } from "~/Hooks";

const cx = classNames.bind(style);

const menuRegex = {
    username: /^[a-zA-Z0-9_]{6,20}$/,
    password:
        /^(?=\S+$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,20}$/,
    repeatPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,20}$/,
    email: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
};

const defaultFnc = () => {};

function BoxInput({
    id = "",
    title = "",
    isCheck = true,
    isPassword = false,
    handleSetValue = defaultFnc,
}) {
    const [value, setValue] = useState("");
    const [check, setCheck] = useState("");
    const [isShowPass, setIsShowPass] = useState(isPassword);
    const debounce = useDebounce(value, 1000);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!debounce) {
            return;
        }
        if (!menuRegex[id].test(debounce) && isCheck) {
            setCheck("warning");
            dispatch(
                addToast({
                    type: "warning",
                    title: `${title} không hợp lệ!`,
                    duration: 3000,
                })
            );
            handleSetValue("");
            return;
        }
        setCheck("success");
        handleSetValue(debounce);
    }, [debounce]);
    const handleOnInput = (e) => {
        setValue(e.target.value);
    };
    const handleOnShowPass = () => {
        setIsShowPass(!isShowPass);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("box_input", { [check]: check })}>
                <input
                    value={value}
                    type={isShowPass ? "password" : "text"}
                    id={id}
                    name={id}
                    placeholder=" "
                    autoComplete="off"
                    onInput={(e) => handleOnInput(e)}
                />
                <label htmlFor={id}>{title}</label>
                {isPassword && (
                    <button
                        className={cx("btn_eye")}
                        onClick={() => handleOnShowPass()}
                    >
                        {isShowPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>
        </div>
    );
}

export default BoxInput;
