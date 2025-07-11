import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import style from "./Product.module.scss";
import Image from "~/Components/Image";
import { formatNumberPrice } from "~/Util/lib/formatNumberPrice";
import { GrView } from "react-icons/gr";

const cx = classNames.bind(style);

const defaultFunc = () => {};
function Product({
    item = {},
    className = "",
    is_action = false,
    handleOnMouseEnter = defaultFunc,
    handleOnMouseLeave = defaultFunc,
}) {
    const classes = cx("wrapper", {
        [className]: className,
        is_action,
    });
    return (
        <Link
            to={item.slug ? `/product/${item.slug}` : `/product/do-an-test`}
            className={classes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            <div className={cx("image")}>
                <Image src={item.image_url || ""} alt="product" />
            </div>
            <div className={cx("content")}>
                <h3>{item.title || "Đố Án Của SrcPlace"}</h3>
                <p>{formatNumberPrice({ number: item.price || 500000 })}</p>
                <div className={cx("views")}>
                    <span>
                        <GrView />
                    </span>
                    <p>{item.sold || 0}</p>
                </div>
            </div>
        </Link>
    );
}

Product.propTypes = {
    // item: PropTypes.object.isRequired,
    className: PropTypes.string,
    is_action: PropTypes.bool,
    handleOnHover: PropTypes.func,
    handleOnMouseLeave: PropTypes.func,
};

export default Product;
