import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaAnglesRight } from "react-icons/fa6";

import style from "./ProductSessions.module.scss";
import Button from "~/Components/Button";
import Product from "~/Components/Product";

const cx = classNames.bind(style);

function ProductSessions({
    title = "",
    to = "",
    className = "",
    products = [],
}) {
    return (
        <div className={cx("wrapper", className)}>
            <div className={cx("extend")}>
                <h3>{title}</h3>
                <Button
                    text
                    to={to}
                    className={cx("products_more")}
                    rightIcon={<FaAnglesRight />}
                >
                    Xem Thêm
                </Button>
            </div>
            <div className={cx("products_item")}>
                {products.map((product, index) => (
                    <Product key={index} className={cx("product")} />
                ))}
            </div>
        </div>
    );
}

ProductSessions.propTypes = {
    title: PropTypes.string,
    to: PropTypes.string,
    className: PropTypes.string,
    products: PropTypes.array.isRequired,
    isAnimation: PropTypes.bool,
};

export default ProductSessions;
