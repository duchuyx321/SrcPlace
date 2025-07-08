import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router";

import style from "./Product.module.scss";
import Image from "~/Components/Image";
import { formatNumberPrice } from "~/Util/lib/formatNumberPrice";

const cx = classNames.bind(style);

function Product({ item = {} }) {
    return (
        <Link className={cx("wrapper")}>
            <div className={cx("image")}>
                <Image src="" alt="product" />
            </div>
            <div className={cx("content")}>
                <h3>Tên Đơn Hàng</h3>
                <p>{formatNumberPrice({ number: 500000 })}</p>
            </div>
        </Link>
    );
}

export default Product;
