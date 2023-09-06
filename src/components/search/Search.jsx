import "./Search.scss";

import {useEffect, useState} from "react";

import { Input } from 'antd';
import useDebounce from "../../hooks/useDebounce";

const { Search } = Input;

const SearchField = ({placeholder, onChange, className = ''}) => {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 300)

    useEffect(() => {
        setQuery(debouncedQuery)
    }, [debouncedQuery])

    return <div className={className}>
        <Search
            placeholder={placeholder}
            size="large"
            allowClear
            onChange={onChange}
            className="__search-field"
        />
    </div>
}

export default SearchField;