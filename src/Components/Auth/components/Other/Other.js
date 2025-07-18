import classNames from "classnames/bind";
import { AiFillGoogleCircle } from "react-icons/ai";
import { BiLogoFacebookCircle } from "react-icons/bi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/scale.css";

import style from "./Other.module.scss";

const cx = classNames.bind(style);
const MenuOther = [
    {
        name: "Google",
        icon: <AiFillGoogleCircle />,
    },
    {
        name: "Facebook",
        icon: <BiLogoFacebookCircle />,
    },
];
function Other() {
    return (
        <div className={cx("wrapper")}>
            {MenuOther.map((item, index) => (
                <Tippy
                    key={index}
                    arrow={true}
                    animation="scale"
                    content={item.name}
                    duration={[500, 0]}
                    theme={item.name.toLowerCase()}
                >
                    <button className={cx("btn_other", item.name)}>
                        {item.icon}
                    </button>
                </Tippy>
            ))}
        </div>
    );
}

export default Other;
