import { Form as AntdForm, Select as AntdSelect } from "antd";

import { Controller } from "react-hook-form";
import classes from "./Select.module.scss";

const Select = ({
  label = "",
  placeholder = "",
  name,
  selectData,
  control,
  error,
  disabled
}) => {
  return (
    <AntdForm.Item className={classes['select-item']} hasFeedback validateStatus={error && error.length > 0 ? 'error' : 'success'}>
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
              disabled={disabled}
            />
          )}
        />
      )}
      {error && error?.length > 0 && <span className={classes.error}>{error}</span>}
    </AntdForm.Item>
  );
};

export default Select;
