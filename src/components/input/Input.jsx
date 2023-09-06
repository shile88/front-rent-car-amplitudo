import "./Input.module.scss";

import {
  addDays,
  differenceInCalendarDays,
  format,
  parseISO,
  startOfDay,
} from "date-fns";

import { Input as AntdInput } from "antd";
import { Controller } from "react-hook-form";
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
  singleCustomerData,
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
    if ((name === "dateFrom" || name === 'dateTo') && type === "date") {
      setValue("dateFrom", formattedDate);
      setValue("dateTo", newFormattedDate);
    }
    if(singleCustomerData) {
        setValue("firstName", singleCustomerData.firstName);
        setValue("lastName", singleCustomerData.lastName);
        setValue("country", singleCustomerData.country);
        setValue("passportNumber", singleCustomerData.passportNumber);
        setValue("phoneNumber", singleCustomerData.phoneNumber);
        setValue("email", singleCustomerData.email);
        setValue("note", singleCustomerData.note);
    }
  }, [singleCustomerData]);


  useEffect(() => {
    const daysDifference = differenceInCalendarDays(endDate, startDate);
    setValue("priceTotal", daysDifference * carData?.dailyRate);
  }, [endDate, startDate]);

  return (
    <div>
      {label && label?.length > 0 && <label>{label}</label>}
      {control && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <AntdInput
              type={type}
              className={"custom-input"}
              placeholder={placeholder}
              {...field}
              
              disabled={
                name === "priceTotal" ||
                (singleCustomerData && name === "passportNumber") || 
                (singleCustomerData && name === "phoneNumber")
                  ? true
                  : false
              }
            />
          )}
        />
      )}
      {error && error?.length > 0 && <span>{error}</span>}
    </div>
  );
};

export default Input;
