import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import style from "./Home.module.scss";
import Seo from "~/Components/Seo";
import Search from "~/Layouts/Components/Header/Components/Search/Search";
import Button from "~/Components/Button";
import ProductSessions from "~/Components/ProductSessions";
import PublicService from "~/Services/PublicService";

const cx = classNames.bind(style);

function Home() {
    const [resultProjectCharge, setResultProjectCharge] = useState([
        1, 1, 1, 1,
    ]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await PublicService.getProject();
            if (!result["error"]) {
                console.log(result);
                setResultProjectCharge(result.paidProjects);
            }
        };
        fetchApi();
    }, []);
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
                    <div className={cx("wrapper_btn")}>
                        <Button outline className={cx("btn_contact")}>
                            Liên Hệ Tư Vấn
                        </Button>
                    </div>
                </div>
                <div className={cx("container")}>
                    <ProductSessions
                        title="Top Dự Án Nỗi Bật"
                        to="/du-an/tra-phi"
                        products={resultProjectCharge}
                        is_animation
                    />
                </div>
            </div>
        </>
    );
}

export default Home;
