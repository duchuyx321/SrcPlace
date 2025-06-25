import classNames from "classnames/bind";

import style from "./NotFund.module.scss";

const cx = classNames.bind(style);

function NotFund() {
    return <div className={cx("wrapper")}>NotFund page</div>;
}

export default NotFund;
