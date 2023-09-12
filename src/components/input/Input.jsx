import { Form as AntdForm, Input as AntdInput } from "antd";
import {
  addDays,
  differenceInCalendarDays,
  format,
  parseISO,
  startOfDay,
} from "date-fns";

import { Controller } from "react-hook-form";
import classes from "./Input.module.scss";
import { useEffect } from "react";

const Input = ({
  label = "",
  placeholder = "",
  name,
  control,
  type,
  error,
  watch,
  setValue,
  carData,
  singleData,
  disabled
}) => {
  const today = startOfDay(new Date());
  const formattedDate = format(today, "yyyy-MM-dd");
  const newDate = addDays(today, 7);
  const newFormattedDate = format(newDate, "yyyy-MM-dd");

  const watchStartDate = watch("dateFrom");
  const watchEndDate = watch("dateTo");

  const startDate = parseISO(watchStartDate);
  const endDate = parseISO(watchEndDate);

  useEffect(() => {
    if ((name === "dateFrom" || name === "dateTo") && type === "date") {
      setValue("dateFrom", formattedDate);
      setValue("dateTo", newFormattedDate);
    }
    if (singleData) {
      const keys = Object.keys(singleData);
      {
        keys.map((key) => {
          setValue(key, singleData[key]);
        });
      }
    }
  }, [singleData]);

  useEffect(() => {
    const daysDifference = differenceInCalendarDays(endDate, startDate);
    setValue("priceTotal", daysDifference * carData?.dailyRate);
  }, [endDate, startDate]);

  return (
    <AntdForm.Item
      className={classes["input-item"]}
      hasFeedback
      validateStatus={error && error.length > 0 ? "error" : "success"}
    >
      {label && label?.length > 0 && <label>{label}</label>}
      {control && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <AntdInput
              type={type}
              allowClear
              className={classes.input}
              placeholder={placeholder}
              {...field}
              disabled={
                name === "priceTotal" ||
                (singleData && name === "passportNumber") ||
                (singleData && name === "phoneNumber") || disabled
                  ? true
                  : false
              }
            />
          )}
        />
      )}
      {error && error?.length > 0 && <span className={classes.error}>{error}</span>}
    </AntdForm.Item>
  );
};

export default Input;
