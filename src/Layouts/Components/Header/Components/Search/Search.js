import classNames from "classnames/bind";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";

import style from "./Search.module.scss";
import Button from "~/Components/Button";
import Menu from "~/Components/Wrapper/Menu";
import { useDebounce } from "~/Hooks";
import PublicService from "~/Services/PublicService";

const cx = classNames.bind(style);

function Search() {
    const [isHide, setIsHide] = useState(false);
    const [value, setValue] = useState("");
    const [resultSearch, setResultSearch] = useState([]);
    const debounced = useDebounce(value, 700);

    useEffect(() => {
        if (!debounced.trim()) {
            setResultSearch([]);
            return;
        }
        // call api
        const fetchApi = async () => {
            const result = await PublicService.search({ text: debounced });
            console.log(result);
            if (result.error) {
                setResultSearch([]);
                return;
            }
            setResultSearch(result);
        };
        fetchApi();
    }, [debounced]);
    console.log(debounced);
    const handleOnInput = (e) => {
        setValue(e.target.value);
    };
    return (
        <div className={cx("wrapper")}>
            <Menu
                hideOnClick={isHide}
                onClickHide={setIsHide}
                title="Kết Quả Tìm Kiếm"
                items={resultSearch}
                isArrow={false}
                large
                isImage
                isPrice
            >
                <div className={cx("search")}>
                    <label htmlFor="search">
                        <input
                            id="search"
                            type="text"
                            placeholder="Nhập từ khóa tìm kiếm"
                            onInput={(e) => handleOnInput(e)}
                            onFocus={() => setIsHide(true)}
                            autoSave="off"
                            autoComplete="off"
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
