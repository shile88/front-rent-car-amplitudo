import Input from "../input/Input";
import Select from "../select/Select";
import SubmitButton from "../buttons/submitButton/SubmitButton";
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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
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
            />
            <Select
              control={control}
              selectData={citiesData}
              label="DropOff location"
              name="locationDropoff"
              placeholder="Choose city"
              error={errors?.city?.message}
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
            singleCustomerData={singleCustomerData}
          />
        ))}

        <SubmitButton label="Submit"></SubmitButton>
      </form>
    </>
  );
};

export default Form;
