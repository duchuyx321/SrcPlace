import classNames from "classnames/bind";

import style from "./Sidebar.module.scss";

const cx = classNames.bind(style);
function Sidebar() {
    return <div className={cx("wrapper")}>Sidebar</div>;
}

export default Sidebar;
