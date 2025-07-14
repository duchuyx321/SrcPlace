import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdOutlineFolderZip } from "react-icons/md";

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
    const [isLogin, setIsLogin] = useState(
        !!localStorage.getItem("AccessToken")
    );
    useEffect(() => {
        const AccessToken = localStorage.getItem("AccessToken");
        setIsLogin(!!AccessToken);
    }, []);
    const [ResultProduct, setResultProduct] = useState({});
    const [isActionAddToCart, setIsActionAddToCart] = useState(false);
    const handleAddToCart = () => {
        // kiểm tra thêm điểu kiện đã đăng nhập hay chưa
        if (!isLogin) {
            // hiển thị thông báo chưa đăng nhập
            return;
        }
        setIsActionAddToCart(true);
        setTimeout(() => {
            setIsActionAddToCart(false);
        }, 500); // 500ms = thời gian animation
    };
    const handleOnBuy = () => {};
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
                        <div className={cx("btn_action")}>
                            <Button
                                outline
                                className={cx("btn_action", "btn_cart")}
                                onClick={() => handleAddToCart()}
                                leftIcon={<BsFillCartPlusFill />}
                            >
                                Thêm Vào Giỏ Hàng
                            </Button>
                            <span
                                className={cx("icon_project", {
                                    addToCart: isActionAddToCart,
                                })}
                            >
                                <MdOutlineFolderZip />
                            </span>
                        </div>

                        <Button primary className={cx("btn_action", "btn_buy")}>
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
