import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router";

import style from "./Product.module.scss";
import Image from "~/Components/Image";
import { formatNumberPrice } from "~/Util/lib/formatNumberPrice";

const cx = classNames.bind(style);

function Product({ item = {}, className = "" }) {
    return (
        <Link className={cx("wrapper", className)}>
            <div className={cx("image")}>
                <Image src="" alt="product" />
            </div>
            <div className={cx("content")}>
                <h3>Tên Đơn Hàng đang test nè đang test nè đang test nè</h3>
                <p>{formatNumberPrice({ number: 500000 })}</p>
            </div>
        </Link>
    );
}

Product.propTypes = {
    // item: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default Product;
