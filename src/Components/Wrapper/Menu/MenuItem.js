import classNames from "classnames/bind";
import PropTypes from "prop-types";

import style from "./Menu.module.scss";
import Image from "~/Components/Image";
import { formatNumberPrice } from "~/Util/lib/formatNumberPrice";
import Button from "~/Components/Button";

const cx = classNames.bind(style);

function MenuItem({ item, isImage = true, isPrice = true }) {
    return (
        <div className={cx("menuItem")}>
            <Button className={cx("item")} large>
                <div className={cx("item_wrapper")}>
                    {isImage && (
                        <span className={cx("item_thumb")}>
                            <Image src="" alt="hình ảnh sản phẩm" />
                        </span>
                    )}
                    <h3 className={cx("item_title")}>
                        Đây là nội dung
                        fuasdgfjksadfgshadgfsadgfsahdgfsudfgsuadyfgsdf
                    </h3>
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
    item: PropTypes.object, // .isRequired
};

export default MenuItem;
