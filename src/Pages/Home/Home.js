import classNames from "classnames/bind";

import style from "./Home.module.scss";
import Seo from "~/Components/Seo";

const cx = classNames.bind(style);

function Home() {
    return (
        <>
            <Seo />
            <div className={cx("wrapper")}>Home Page</div>
        </>
    );
}

export default Home;
