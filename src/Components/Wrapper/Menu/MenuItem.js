import classNames from "classnames/bind";
import PropTypes from "prop-types";

import style from "./Menu.module.scss";
import Image from "~/Components/Image";
import { formatNumberPrice } from "~/Util/lib/formatNumberPrice";
import Button from "~/Components/Button";

const cx = classNames.bind(style);

function MenuItem({ item, isImage = false, isPrice = false, onChange }) {
    const link = item.to || (item.slug ? `/${item.slug}` : "");
    const imageSrc = item.thumbnail?.image_url || item.image_url || "";
    const title = item.name || item.title || "";
    const price = item.price;
    const icon = item.icon || "";
    return (
        <div className={cx("menuItem")}>
            <Button
                to={link}
                leftIcon={icon}
                className={cx("item")}
                onClick={onChange}
                large
            >
                <div className={cx("item_wrapper")}>
                    {isImage && imageSrc && (
                        <span className={cx("item_thumb")}>
                            <Image src={imageSrc} alt="hình ảnh sản phẩm" />
                        </span>
                    )}
                    <h3 className={cx("item_title")}>{title}</h3>
                    {isPrice && price != null && (
                        <p className={cx("item_price")}>
                            {formatNumberPrice({ number: price })}
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
