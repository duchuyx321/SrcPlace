import classNames from "classnames/bind";
import { AiOutlineHome, AiFillTags } from "react-icons/ai";
import { LuAlignJustify } from "react-icons/lu";
import { NavLink } from "react-router";

import style from "./Sidebar.module.scss";

const cx = classNames.bind(style);
const MenuSidebars = [
    {
        key: "Home",
        to: "/",
        name: "Trang Chủ",
        icon: <AiOutlineHome />,
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
                    to={item.to}
                    className={(e) =>
                        cx("btn_sidebar", { isActive: e.isActive })
                    }
                >
                    {item.name}
                </NavLink>
            ))}
        </div>
    );
}

export default Sidebar;
