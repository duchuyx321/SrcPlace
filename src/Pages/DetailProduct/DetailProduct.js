import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdOutlineFolderZip } from "react-icons/md";
import { useDispatch } from "react-redux";

import style from "./DetailProduct.module.scss";
import Seo from "~/Components/Seo";
import images from "~/Assets/images";
import MetaInfo from "./Components/MetaInfo";
import Support from "./Components/Support";
import { formatNumberPrice } from "~/Util/lib/formatNumberPrice";
import Button from "~/Components/Button";
import { addToCart, calculateTotal } from "~/Features/Cart/cartSlice";
import { buyNow, calculateTotalBuy } from "~/Features/Checkout/checkoutSlice";
import MediaPreview from "./Components/MediaPreview";

const cx = classNames.bind(style);

function DetailProduct() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(
        !!localStorage.getItem("AccessToken")
    );
    useEffect(() => {
        const AccessToken = localStorage.getItem("AccessToken");
        setIsLogin(!!AccessToken);
    }, []);
    const [resultProduct, setResultProduct] = useState({});
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
        //  thêm vào trong reducer
        dispatch(
            addToCart({
                _id: resultProduct._id,
                title: resultProduct.title,
                image_url: resultProduct.image_url,
                price: resultProduct.price,
            })
        );
        dispatch(calculateTotal());
    };
    const handleOnBuy = () => {
        dispatch(
            buyNow({
                _id: resultProduct._id,
                title: resultProduct.title,
                image_url: resultProduct.image_url,
                price: resultProduct.price,
            })
        );
        dispatch(calculateTotalBuy());
        navigate("/checkout");
    };
    const mediaList = [
        {
            type: "video",
            url: resultProduct.video_url || "g_K1w8e0lLo",
        },
        {
            type: "image",
            url: resultProduct.thumbnail?.image_url || "",
        },
    ];
    return (
        <>
            <Seo
                title={`${
                    resultProduct.title || "Đố Án Của SrcPlace"
                } | SrcPlace - Thư Viện Đồ Án`}
                description={`Đây là trang xem chi tiết sản phẩm ${
                    resultProduct.title || "Đố Án Của SrcPlace"
                } của SrcPlace`}
                noIndex={false}
                image={resultProduct.thumbnail?.image_url || images.noImage}
                canonical={`${process.env.REACT_APP_URL_CLIENT}${slug}`}
            />
            <div className={cx("wrapper")}>
                <span className={cx("thumb_product")}>
                    <MediaPreview items={mediaList} />
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

                        <Button
                            primary
                            className={cx("btn_action", "btn_buy")}
                            onClick={() => handleOnBuy()}
                        >
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
