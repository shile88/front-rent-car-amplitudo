import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CustomerValidation from "../../../validation/customerValidation/CustomerValidation";
import { countryService } from "../../../services/CountryService";
import { customerService } from "../../../services/CustomerService";
import { message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AddCustomer = ({ id, close, disabled }) => {
  const queryClient = useQueryClient();
  const [customerError, setCustomerError] = useState({})
  const { t } = useTranslation("global");

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
        message.success(t('ant-messages.successAdd'));
        queryClient.invalidateQueries("customers");
        close();
      })
      .catch((err) => {
        const errorObject = err?.response.data.errors
        const transformedErrors = Object.keys(errorObject).reduce((acc, field) => {
          acc[field] = errorObject[field][0];
          return acc;
        }, {});
        setCustomerError(transformedErrors)
        console.log(errorObject)
        message.error(t('ant-messages.error'));
      })
  );

  const get = (id) => {
    return customerService
      .get(id)
      .then((res) => {
       
        return res;
      })
      .catch((err) => {
        message.error(t('ant-messages.error'));
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
        message.success(t('ant-messages.successEdit'));
        queryClient.invalidateQueries("customers");
        close();
      })
      .catch((err) => {
        console.log(err?.response?.data);
        message.error(t('ant-messages.error'));
      })
  );

  const onSave = (formData) => {
    const editObject = {
      country_id: formData.country,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone_number: formData.phone_number,
      note: formData.note,
      id: id 
    }
    if (id) {
      edit.mutate(editObject);
    } else {
      add.mutate(formData);
    }
  };

  return (
    <CustomerValidation
      singleCustomerData={singleCustomerData}
      onSave={onSave}
      countriesData={countriesData}
      disabled={disabled}
      customerError={customerError}
    />
  );
};

export default AddCustomer;
