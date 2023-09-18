import * as yup from "yup";

import Form from "../../components/formComponents/form/Form";
import { useTranslation } from "react-i18next";

const CustomerValidation = ({ onSave, countriesData, singleCustomerData, disabled, customerError }) => {
  const { t } = useTranslation("global");
  const schema = yup.object().shape({
    first_name: yup
      .string()
      .trim()
      .matches(/^[A-Za-z]+$/, t('validation.onlyLetter'))
      .required(t('validation.required'))
      .min(2, t('validation.min2'))
      .max(50, t('validation.max50')),
    last_name: yup
      .string()
      .trim()
      .matches(/^[A-Za-z]+$/, t('validation.onlyLetter'))
      .required(t('validation.required'))
      .min(2, t('validation.min2'))
      .max(50, t('validation.max50')),
    country_id: yup.number().required(t('validation.required')),
    passport_number: yup
      .string()
      .required(t('validation.required'))
      .matches(/^\d{12}$/, t('validation.passport')),
    phone_number: yup
      .string()
      .required(t('validation.required'))
      .matches(/^\d+$/, t('validation.phoneNumbers'))
      .min(9, t('validation.phoneMin')),
    email: yup.string().email(t('validation.email')).required(t('validation.required')),
    note: yup.string().max(15, t('validation.max15')).nullable(),
  });

  const formData = [
    {
      label: t("table.firstName"),
      name: "first_name",
      type: "text",
      placeholder: t("table.firstNamePlaceholder")
    },
    {
      label: t("table.lastName"),
      name: "last_name",
      type: "text",
      placeholder: t("table.lastNamePlaceholder")
    },
    {
      label: t("table.country"),
      name: "country_id",
      type: "number",
      placeholder:  t("table.countryPlaceholder")
    },
    {
      label: "Email",
      name: "email",
      type: "text",
      placeholder: t("table.emailPlaceholder")
    },
    {
      label: t("table.passportNo"),
      name: "passport_number",
      type: "text",
      placeholder: t("table.passportNoPlaceholder")
    },
    {
      label: t("table.phoneNo"),
      name: "phone_number",
      type: "text",
      placeholder: t("table.phoneNoPlaceholder")
    },
    {
      label: t("table.notes"),
      name: "note",
      type: "text",
      placeholder: t("table.notesPlaceholder"),
    },
  ];

  return (
    <div>
      <Form
        formData={formData}
        onSubmit={onSave}
        countriesData={countriesData}
        schema={schema}
        singleCustomerData={singleCustomerData}
        disabled={disabled}
        customerError={customerError}
      />
    </div>
  );
};

export default CustomerValidation;
