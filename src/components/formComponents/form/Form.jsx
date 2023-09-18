import { Form as AntdForm } from "antd";
import Input from "../input/Input";
import Select from "../select/Select";
import SubmitButton from "../../buttons/submitButton/SubmitButton";
import classes from "./Form.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const Form = ({
  schema,
  onSubmit,
  formData,
  loginErrorMsg,
  countriesData,
  customersData,
  citiesData,
  carReservationData,
  singleCustomerData,
  singleAddCarData,
  disabled,
  singleReservationData,
  customerError,
  loggingStatus,
}) => {
  const navigate = useNavigate();
  
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
   
  });
  
  const handleInputBlur = (inputName) => {
    if (Object.keys(errors).length === 0) return "";
    if (errors[inputName]) return "error";
    if (!errors[inputName]) return "success";
  };

  return (
    <AntdForm
      onFinish={(data) => {
        handleSubmit((data) => {
          onSubmit(data);
          reset();
          data.drop_off_location ? navigate("/reservations") : ""; // Reset the form after submitting
        })(data);
      }}
      className={classes.form}
    >
      {formData.map((data, index) => (
        <AntdForm.Item
          className={classes["form-item"]}
          key={index}
          hasFeedback
          validateStatus={handleInputBlur(data.name)}
        >
          {data.type === "number" ? (
            <Select
              control={control}
              customersData={customersData}
              selectData={citiesData || countriesData}
              label={data.label}
              name={data.name}
              setValue={setValue}
              singleReservationData={singleReservationData}
              placeholder={data.placeholder}
              error={errors?.[data.name]?.message}
              disabled={disabled}
              onBlur={() => handleInputBlur(data.name)}
            />
          ) : (
            <Input
              label={data.label}
              name={data.name}
              placeholder={data.placeholder}
              type={data.type}
              control={control}
              error={
                errors?.[data.name]?.message ||
                loginErrorMsg?.message ||
                customerError?.[data.name]
              }
              watch={watch}
              setValue={setValue}
              carReservationData={carReservationData}
              singleData={
                singleCustomerData || singleAddCarData || singleReservationData
              }
              disabled={disabled}
              onBlur={() => handleInputBlur(data.name)}
            />
          )}
        </AntdForm.Item>
      ))}
      {!disabled && (
        <div className={classes.button}>
          <SubmitButton
            label={loggingStatus ? "Logging in" : "Submit"}
            disabled={loggingStatus}
            className={loggingStatus ? "logging" : ""}
          />
        </div>
      )}
    </AntdForm>
  );
};

export default Form;
