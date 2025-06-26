import PropTypes from "prop-types";
import classNames from "classnames/bind";

import style from "./DefaultLayout.module.scss";

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <header>Header default</header>
            <div className={cx("body")}>
                <aside className={cx("sidebar")}>Sidebar default</aside>
                <main className={cx("content")}>{children}</main>
            </div>
            <footer></footer>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
