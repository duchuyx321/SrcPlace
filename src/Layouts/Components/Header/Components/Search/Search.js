import classNames from "classnames/bind";
import { IoIosSearch } from "react-icons/io";

import style from "./Search.module.scss";
import Button from "~/Components/Button";
import Menu from "~/Components/Wrapper/Menu";

const cx = classNames.bind(style);

function Search() {
    return (
        <div className={cx("wrapper")}>
            <Menu
                hideOnClick={true}
                title="Kết Quả Tìm Kiếm"
                items={[1, 2, 3, 45, 5]}
                isArrow={false}
                large
            >
                <div className={cx("search")}>
                    <label htmlFor="search">
                        <input
                            id="search"
                            type="text"
                            placeholder="Nhập từ khóa tìm kiếm"
                        />
                    </label>
                    <Button primary className={cx("btn_search")} small>
                        <IoIosSearch />
                    </Button>
                </div>
            </Menu>
        </div>
    );
}

export default Search;
