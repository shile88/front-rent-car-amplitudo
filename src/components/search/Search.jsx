import "./Search.scss";

import { DatePicker, Input, Space } from "antd";
import { useEffect, useState } from "react";

import useDebounce from "../../hooks/useDebounce";
import { useTranslation } from "react-i18next";

const { Search } = Input;
const { RangePicker } = DatePicker;

const SearchField = ({ placeholder, onChange, className = "", dateSearch }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { t } = useTranslation("global");

  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className={className}>
      {dateSearch ? (
        <Space direction="vertical" size={12}>
          <RangePicker
            allowClear
            onChange={dateSearch}
            placeholder={[
              t("search.placeholderStart"),
              t("search.placeholderEnd"),
            ]}
          />
        </Space>
      ) : (
        <Search
          placeholder={placeholder}
          size="large"
          allowClear
          onChange={onChange}
          className="__search-field"
        />
      )}
    </div>
  );
};

export default SearchField;
