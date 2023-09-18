import * as yup from "yup";

import Form from "../../components/formComponents/form/Form";
import { useTranslation } from "react-i18next";

const LoginValidation = ({ onSubmit, loginErrorMsg, loggingStatus }) => {
  const { t } = useTranslation("global");
  const schema = yup.object({
    email: yup.string().email(t('validation.email')).required(t('validation.required')),
    password: yup
      .string()
      .required(t('validation.required'))
      .matches(
        /^[a-zA-Z0-9!#%&]{4,12}$/,
        t('validation.password')
      ),
  });

  const formData = [
    {
      label: "Email",
      name: "email",
      type: "text",
      placeholder: t("table.emailPlaceholder")
    },
    {
      label: t("table.password"),
      name: "password",
      type: "password",
      placeholder: t("table.passwordPlaceholder")
    },
  ];

  return (
    <div>
      <Form
        formData={formData}
        onSubmit={onSubmit}
        loginErrorMsg={loginErrorMsg}
        schema={schema}
        loggingStatus={loggingStatus}
      />
    </div>
  );
};

export default LoginValidation;
