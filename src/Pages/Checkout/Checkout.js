import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import style from "./Checkout.module.scss";
import Seo from "~/Components/Seo";
import {
    selectCheckoutItems,
    selectCheckoutTotal,
} from "~/Features/Checkout/checkoutSelect";
import { formatNumberPrice } from "~/Util/lib/formatNumberPrice";
import Button from "~/Components/Button";
import Product from "./Components/Product";

const cx = classNames.bind(style);

function Checkout() {
    const items = [0, 0, 0]; //useSelector(selectCheckoutItems) ;
    let total = useSelector(selectCheckoutTotal);
    console.log(items);
    return (
        <>
            <Seo
                title="Thanh Toán | SrcPlace"
                description="Trang Thanh Toán của SrcPlace để thanh toán đơn hàng của bạn."
            />
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <div className={cx("item")}>
                        <p className={cx("product")}>Sản Phẩm</p>
                        <p className={cx("amount")}>Giá Tiền</p>
                    </div>
                </div>
                <div className={cx("products")}>
                    {items.map((product, index) => (
                        <Product key={index} data={product} />
                    ))}
                </div>
                <div className={cx("action")}>
                    <div className={cx("general")}>
                        <p>{`Tổng cộng(${items.length || 1} sản phẩm): `}</p>
                        <span>
                            {formatNumberPrice({ number: total || 500000 })}
                        </span>
                    </div>
                    <Button primary className={cx("btn_buy")}>
                        Mua Ngay
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Checkout;
