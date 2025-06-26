import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { forwardRef, useState } from "react";

import style from "./Image.module.scss";
import image from "~/Assets/Image";

const cx = classNames.bind(style);

const Image = forwardRef(
    (
        { src = "", alt = "", classNames = "", fallback = "", ...props } = {},
        ref
    ) => {
        const [fallbackSrc, setFallbackSrc] = useState("");

        const handleError = () => {
            setFallbackSrc(fallback || image.noImage);
        };
        return (
            <img
                className={cx("wrapper", classNames)}
                ref={ref}
                src={fallbackSrc || src}
                alt={alt}
                {...props}
                onError={handleError}
            />
        );
    }
);

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
