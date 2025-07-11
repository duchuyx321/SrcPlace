import PropTypes from "prop-types";
import classNames from "classnames/bind";

import style from "./DefaultLayout.module.scss";
import Header from "~/Layouts/Components/Header";
import Footer from "~/Layouts/Components/Footer";
import Sidebar from "~/Layouts/Components/Sidebar";

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <Header />
            </header>
            <div className={cx("container")}>
                <aside className={cx("sidebar")}>
                    <Sidebar />
                </aside>
                <div className={cx("body")}>
                    <main className={cx("content")}>{children}</main>
                </div>
                <footer className={cx("footer")}>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
