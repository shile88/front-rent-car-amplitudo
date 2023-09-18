import {
  addDays,
  differenceInCalendarDays,
  format,
  parseISO,
  startOfDay,
} from "date-fns";

import { Input as AntdInput } from "antd";
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
  carReservationData,
  singleData,
  disabled,
  onBlur,
}) => {
  const watchStartDate = watch("date_from");
  const watchEndDate = watch("date_to");

  const startDate = parseISO(watchStartDate);
  const endDate = parseISO(watchEndDate);

  const today = startOfDay(new Date());
  const formattedDate = format(today, "yyyy-MM-dd");
  const newDate = addDays(today, 7);
  const newFormattedDate = format(newDate, "yyyy-MM-dd");

  useEffect(() => {
    if (singleData) {
      const keys = Object.keys(singleData);
      {
        const keysToSkip = ['customer_id', 'pickup_location', 'drop_off_location'];
        keys.map((key) => {
          if (!keysToSkip.includes(key)) {
            setValue(key, singleData[key]);
          }
        });
      }
    } else if (carReservationData) {
      setValue("date_from", formattedDate);
      setValue("date_to", newFormattedDate);
      setValue("price", 7 * carReservationData.daily_rate);
    }
  }, [singleData, carReservationData]);

  console.log(singleData)
  useEffect(() => {
    const daysDifference = differenceInCalendarDays(endDate, startDate);
    setValue(
      "price",
      carReservationData
        ? daysDifference * carReservationData?.daily_rate
        : daysDifference * singleData?.daily_rate
    );
  }, [endDate, startDate]);

  return (
    <>
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
                name === "price" ||
                (singleData && name === "passport_number") ||
                (singleData && name === "email") ||
                disabled
                  ? true
                  : false
              }
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

export default Input;
