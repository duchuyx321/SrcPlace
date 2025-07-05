import classNames from "classnames/bind";

import style from "./Home.module.scss";
import Seo from "~/Components/Seo";

const cx = classNames.bind(style);

function Home() {
    return (
        <>
            <Seo />
            {/* html */}
            <div className={cx("wrapper")}></div>
        </>
    );
}

export default Home;
