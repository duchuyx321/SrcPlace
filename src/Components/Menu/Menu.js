import PropTypes from "prop-types";
import classNames from "classnames/bind";

import style from "./Menu.module.scss";

const cx = classNames.bind(style);

function Menu({ children, item = [], hideOnClick = false, onChange }) {
    return <div> Menu</div>;
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    item: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
