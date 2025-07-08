import classNames from "classnames/bind";
import { useState } from "react";
import { IoMdPricetags } from "react-icons/io";

import style from "./Home.module.scss";
import Seo from "~/Components/Seo";
import Search from "~/Layouts/Components/Header/Components/Search/Search";
import Button from "~/Components/Button";
import Product from "~/Components/Product";

const cx = classNames.bind(style);

function Home() {
    const [resultProjectCharge, setResultProjectCharge] = useState([
        1, 1, 1, 1, 1,
    ]);
    return (
        <>
            <Seo />
            {/* html */}
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <div className={cx("title")}>
                        <h3>SRCPlace - Nơi Cung Cấp Đồ Án Uy Tín</h3>
                        <p>
                            Bán Đồ Án An toàn, Uy Tín Và Chất Lượng Tại SrcPlace
                        </p>
                    </div>
                    <div className={cx("wrapper_search")}>
                        <Search />
                    </div>
                </div>
                <div className={cx("container")}>
                    <div className={cx("charge")}>
                        <h3>Các Dự Án Trả Phí Nỗi Bật</h3>
                        <div className={cx("charge_product")}>
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
