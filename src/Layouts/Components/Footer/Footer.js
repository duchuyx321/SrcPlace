import classNames from "classnames/bind";

import image from "~/Assets/Image";
import style from "./Footer.module.scss";

const cx = classNames.bind(style);

function Footer() {
    return <div className={cx("wrapper")}>Footer default</div>;
}

export default Footer;
