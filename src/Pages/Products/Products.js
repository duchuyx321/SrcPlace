import classNames from "classnames/bind";

import style from "./Products.module.scss";
import { useState } from "react";
import ProductSessions from "~/Components/ProductSessions";
import Pagination from "~/Components/Pagination";

const cx = classNames.bind(style);
function Products() {
    const [resultProducts, setResultProducts] = useState([
        1, 2, 3, 4, 5, 6, 7, 8,
    ]);
    const [page, setPage] = useState(1);
    const handleOnNextPage = (num) => {
        setPage(num);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <ProductSessions
                    className={cx("products")}
                    title="Danh Sách Đồ Án SrcPlace"
                    products={resultProducts}
                    is_more={false}
                />
            </div>
            <div className={cx("pagination")}>
                <Pagination page={page} handleOnNextPage={handleOnNextPage} />
            </div>
        </div>
    );
}

export default Products;
