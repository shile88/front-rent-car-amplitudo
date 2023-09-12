import * as yup from "yup";

import Form from "../../components/form/Form";

const CustomerValidation = ({ onSave, countriesData, singleCustomerData, disabled }) => {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .matches(/^[A-Za-z]+$/, 'Name can only contain letters')
      .required("Field required!")
      .min(2, "Minimum length is 2!")
      .max(50, "Maximum length is 50!"),
    lastName: yup
      .string()
      .trim()
      .matches(/^[A-Za-z]+$/, 'Name can only contain letters')
      .required("Field required!")
      .min(2, "Minimum length is 2!")
      .max(50, "Maximum length is 50!"),
    country: yup.number().required("Field required!"),
    passportNumber: yup
      .string()
      .required("Field required!")
      .matches(/^\d{12}$/, 'Passport number must be exactly 12 digits'),
    phoneNumber: yup
      .string()
      .required("Field required!")
      .matches(/^\d+$/, 'Phone number can only contain numbers')
      .min(9, 'Phone number must be at least 9 digits'),
    email: yup.string().email().required("Field required!"),
    note: yup.string().max(15, "Maximum length is 15!"),
  });

  const formData = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      type: "text",
    },
    {
      label: "Passport Number",
      name: "passportNumber",
      type: "text",
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "text",
    },
    {
      label: "Note",
      name: "note",
      type: "text",
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
      />
    </div>
  );
};

export default CustomerValidation;
