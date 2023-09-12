import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CustomerValidation from "../../../validation/customerValidation/CustomerValidation";
import { countryService } from "../../../services/CountryService";
import { customerService } from "../../../services/CustomerService";
import { message } from "antd";

const AddCustomer = ({ id, close, disabled }) => {
  const queryClient = useQueryClient();

  const { data: countriesData } = useQuery(
    ["countries"],
    () => countryService.getCountriesData(),
    {
      enabled: true,
      initialData: [],
    }
  );

  const add = useMutation((data) =>
    customerService
      .add(data)
      .then((r) => {
        message.success("Succesfully added!");
        queryClient.invalidateQueries("customers");
        close();
      })
      .catch((err) => {
        console.log(err?.response?.data);
        message.error("There has been an error!");
      })
  );

  const get = (id) => {
    return customerService
      .get(id)
      .then((res) => {
       
        return res;
      })
      .catch((err) => {
        message.error("There has been an error!");
      });
  };

  const { data: singleCustomerData } = useQuery(
    ["customer-single", id],
    () => get(id),
    {
      enabled: Boolean(id),
    }
  );

  const edit = useMutation((data) =>
    customerService
      .edit(data)
      .then((r) => {
        message.success("Sucessfully edited!");
        queryClient.invalidateQueries("customers");
        close();
      })
      .catch((err) => {
        console.log(err?.response?.data);
        message.error("There has been an error!");
      })
  );

  const onSave = (formData) => {
    const saveObject = {
      country_id: formData.country,
      first_name: formData.firstName,
      last_name: formData.lastName,
      passport_number: formData.passportNumber,
      phone_number: formData.phoneNumber,
      email: formData.email,
      note: formData.note,
    };
    const editObject = {
      country_id: formData.country,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      note: formData.note,
      id: id 
    }
    if (id) {
      edit.mutate(editObject);
    } else {
      add.mutate(saveObject);
    }
  };

  return (
    <CustomerValidation
      singleCustomerData={singleCustomerData}
      onSave={onSave}
      countriesData={countriesData}
      disabled={disabled}
    />
  );
};

export default AddCustomer;
