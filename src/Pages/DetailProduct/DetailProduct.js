import classNames from "classnames/bind";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";

import style from "./DetailProduct.module.scss";
import Seo from "~/Components/Seo";
import images from "~/Assets/images";
import Image from "~/Components/Image";
import MetaInfo from "./Components/MetaInfo";
import Support from "./Components/Support";
import { formatNumberPrice } from "~/Util/lib/formatNumberPrice";
import Button from "~/Components/Button";

const cx = classNames.bind(style);

function DetailProduct() {
    const { slug } = useParams();
    const [ResultProduct, setResultProduct] = useState({});
    return (
        <>
            <Seo
                title={`${
                    ResultProduct.title || "Đố Án Của SrcPlace"
                } | SrcPlace - Thư Viện Đồ Án`}
                description={`Đây là trang xem chi tiết sản phẩm ${
                    ResultProduct.title || "Đố Án Của SrcPlace"
                } của SrcPlace`}
                noIndex={false}
                image={ResultProduct.image_url || images.noImage}
                canonical={`${process.env.REACT_APP_URL_CLIENT}${slug}`}
            />
            <div className={cx("wrapper")}>
                <span className={cx("thumb_product")}>
                    <Image src="" alt="" />
                </span>
                <div className={cx("content")}>
                    <h3 className={cx("title")}>
                        [ 2025 ] Đồ Án Website Bán Điện Thoại | ReactJs - NodeJS
                        - MongoDB - Gemini
                    </h3>
                    <div className={cx("metaInfo")}>
                        <MetaInfo />
                    </div>
                    <div className={cx("price")}>
                        <p>{formatNumberPrice({ number: 500000 })}</p>
                    </div>
                    <div className={cx("support")}>
                        <Support />
                    </div>
                    <div className={cx("action")}>
                        <Button
                            outline
                            className={cx("btn_cart")}
                            leftIcon={<BsFillCartPlusFill />}
                        >
                            Thêm Vào Giỏ Hàng
                        </Button>
                        <Button primary className={cx("btn_buy")}>
                            Mua Ngay
                        </Button>
                    </div>
                </div>
            </div>
            ;
        </>
    );
}

export default DetailProduct;
