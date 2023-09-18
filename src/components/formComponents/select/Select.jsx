import { Select as AntdSelect } from "antd";
import { Controller } from "react-hook-form";
import classes from "./Select.module.scss";
import { useEffect } from "react";

const Select = ({
  label = "",
  placeholder = "",
  name,
  selectData,
  customersData,
  control,
  error,
  disabled,
  onBlur,
  setValue,
  singleReservationData
}) => {

  useEffect(() => {
    setValue('customer_id', singleReservationData?.customer_id)
    setValue('pickup_location', singleReservationData?.pickup_location_id)
    setValue('drop_off_location', singleReservationData?.drop_off_location_id)
  }, [singleReservationData])

  return (
    <>
      {label && label?.length > 0 && <label>{label}</label>}
      {control && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <AntdSelect
            {...field}
              className={"custom-input"}
              placeholder={placeholder}
              options={
                name === "customer_id"
                  ? customersData.map((item) => ({
                      value: item.id,
                      label: `${item.first_name} ${item.last_name}`,
                    }))
                  : name === "drop_off_location" ||
                    name === "pickup_location" ||
                    name === "country_id"
                  ? selectData.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))
                  : []
              }
              allowClear
             
              disabled={(disabled && name === "customer") || disabled}
              onBlur={onBlur}
            />
          )}
        />
      )}
      {error && error?.length > 0 && (
        <span className={classes.error}>{error}</span>
      )}
    </>
  );
};

export default Select;
