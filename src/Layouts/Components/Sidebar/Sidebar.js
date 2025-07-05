import classNames from "classnames/bind";
import { AiFillHome, AiFillTags } from "react-icons/ai";

import { BsCaretLeftFill } from "react-icons/bs";
import { LuAlignJustify } from "react-icons/lu";
import { NavLink } from "react-router";

import style from "./Sidebar.module.scss";

const cx = classNames.bind(style);
const MenuSidebars = [
    {
        key: "Home",
        to: "/",
        name: "Trang Chủ",
        icon: <AiFillHome />,
    },
    {
        key: "category",
        to: "/category",
        name: "Danh Mục",
        icon: <LuAlignJustify />,
    },
    {
        key: "tags",
        to: "/tags",
        name: "Tags",
        icon: <AiFillTags />,
    },
];
function Sidebar() {
    return (
        <div className={cx("wrapper")}>
            {MenuSidebars.map((item) => (
                <NavLink
                    key={item.key}
                    to={item.to}
                    className={(e) =>
                        cx("btn_sidebar", { isActive: e.isActive })
                    }
                >
                    <span>{item.icon}</span>
                    <h3>{item.name}</h3>
                </NavLink>
            ))}
        </div>
    );
}

export default Sidebar;
