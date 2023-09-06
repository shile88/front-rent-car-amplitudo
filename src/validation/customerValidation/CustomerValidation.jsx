import * as yup from "yup";

import Form from "../../components/form/Form";

const CustomerValidation = ({ onSave, countriesData, singleCustomerData }) => {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .required("Field required!")
      .min(2, "Minimum length is 2!")
      .max(50, "Maximum length is 50!"),
    lastName: yup
      .string()
      .trim()
      .required("Field required!")
      .min(2, "Minimum length is 2!")
      .max(50, "Maximum length is 50!"),
    country: yup.number().required("Field required!"),
    passportNumber: yup
      .string()
      .required("Field required!")
      .length(12, "Field must be exactly 12 characters long!"),
    phoneNumber: yup
      .string()
      .required("Field required!")
      .min(9, "Minimum length is 9!")
      .max(15, "Maximum length is 15!"),
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
      type: "password",
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
      />
    </div>
  );
};

export default CustomerValidation;
