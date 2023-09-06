import "./Select.module.scss";

import { Select as AntdSelect } from "antd";
import { Controller } from "react-hook-form";

const Select = ({
  label = "",
  placeholder = "",
  name,
  selectData,
  control,
  error,
}) => {
  return (
    <div>
      {label && label?.length > 0 && <label>{label}</label>}
      {control && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <AntdSelect
              className={"custom-input"}
              placeholder={placeholder}
              options={
                selectData[0]?.firstName
                  ? selectData.map((item) => ({
                      value: item.id,
                      label: item.firstName,
                    }))
                  : selectData.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))
              }
              allowClear
              {...field}
            />
          )}
        />
      )}
      {error && error?.length > 0 && <span>{error}</span>}
    </div>
  );
};

export default Select;
