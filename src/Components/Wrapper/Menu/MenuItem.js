import classNames from "classnames/bind";
import PropTypes from "prop-types";

import style from "./Menu.module.scss";
import Image from "~/Components/Image";
import { formatNumberPrice } from "~/Util/lib/formatNumberPrice";
import Button from "~/Components/Button";

const cx = classNames.bind(style);

function MenuItem({ item, isImage = false, isPrice = false, onChange }) {
    return (
        <div className={cx("menuItem")}>
            <Button
                to={item.to}
                className={cx("item")}
                onClick={onChange}
                large
            >
                <div className={cx("item_wrapper")}>
                    {isImage && (
                        <span className={cx("item_thumb")}>
                            <Image src="" alt="hình ảnh sản phẩm" />
                        </span>
                    )}
                    <h3 className={cx("item_title")}>{item.name}</h3>
                    {isPrice && (
                        <p className={cx("item_price")}>
                            {formatNumberPrice({ number: 1000000 })}
                        </p>
                    )}
                </div>
            </Button>
        </div>
    );
}

MenuItem.propTypes = {
    isImage: PropTypes.bool,
    isPrice: PropTypes.bool,
    onChange: PropTypes.func,
    item: PropTypes.object, // .isRequired
};

export default MenuItem;
