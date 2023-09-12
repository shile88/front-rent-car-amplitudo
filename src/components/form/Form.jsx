import { Form as AntdForm } from "antd";
import Input from "../input/Input";
import Select from "../select/Select";
import SubmitButton from "../buttons/submitButton/SubmitButton";
import classes from './Form.module.scss'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Form = ({
  schema,
  onSubmit,
  formData,
  errorMsg,
  countriesData,
  customersData,
  citiesData,
  carData,
  singleCustomerData,
  singleCarData,
  disabled
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
      <AntdForm
        onFinish={handleSubmit(onSubmit)}
        className={classes.form}
      >
        {countriesData && (
          <Select
            control={control}
            selectData={countriesData}
            label="Country"
            name="country"
            placeholder="Choose country"
            error={errors?.country?.message}
            singleCustomerData={singleCustomerData}
            disabled={disabled}
          />
        )}

        {citiesData && (
          <>
            <Select
              control={control}
              selectData={citiesData}
              label="Pickup Location"
              name="locationPickup"
              placeholder="Choose city"
              error={errors?.city?.message}
              disabled={disabled}
            />
            <Select
              control={control}
              selectData={citiesData}
              label="DropOff location"
              name="locationDropoff"
              placeholder="Choose city"
              error={errors?.city?.message}
              disabled={disabled}
            />
          </>
        )}

        {customersData && (
          <Select
            control={control}
            selectData={customersData}
            label="Customer"
            name="customer"
            placeholder="Choose customer"
            error={errors?.customer?.message}
            disabled={disabled}
          />
        )}
        {formData.map((data, index) => (
          <Input
            label={data.label}
            name={data.name}
            type={data.type}
            key={index}
            control={control}
            error={errors?.[data.name]?.message || errorMsg?.message}
            watch={watch}
            setValue={setValue}
            carData={carData}
            singleData={singleCustomerData || singleCarData}
            disabled={disabled}
          />
        ))}

          <div className={classes.button}>
            <SubmitButton label="Submit"/>
          </div>
        
      </AntdForm>
    
  );
};

export default Form;
