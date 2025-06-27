import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { CiWarning } from "react-icons/ci";

import style from "./DefaultLayout.module.scss";
import Header from "~/Layouts/Components/Header";
import Footer from "~/Layouts/Components/Footer";

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 740);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 740);
        };
        window.addEventListener("resize", handleResize);
        return () => window.addEventListener("resize", handleResize);
    }, []);
    if (isMobile) {
        return (
            <div className={cx("wrapper")}>
                <div className={cx("waring")}>
                    <span>
                        <CiWarning />
                    </span>
                    <h3>
                        Rất tiếc! Giao diện hiện tại chưa hỗ trợ tốt trên thiết
                        bị di động.
                    </h3>
                    <p>
                        Chúng tôi đang phát triển phiên bản mobile để mang lại
                        trải nghiệm tốt hơn cho bạn.
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <Header />
            </header>
            <div className={cx("container")}>
                <div className={cx("body")}>
                    <aside className={cx("sidebar")}>Sidebar default</aside>
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
