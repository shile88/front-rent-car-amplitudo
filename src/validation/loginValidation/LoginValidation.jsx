import * as yup from "yup";

import Form from "../../components/form/Form";

const LoginValidation = ({ onSubmit, errorMsg }) => {
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .matches(
        /^[a-zA-Z0-9!#%&]{4,12}$/,
        "Password must be 4-12 characters and can include letters, numbers and special characters ! # % &"
      ),
  });

  const formData = [
    {
      label: "Email",
      name: "email",
      type: "text",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
  ];

  return (
    <div>
      <Form formData={formData} onSubmit={onSubmit} errorMsg={errorMsg} schema={schema}/>
    </div>
  );
};

export default LoginValidation;
