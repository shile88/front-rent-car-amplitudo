import LoginValidation from "../../validation/loginValidation/LoginValidation";
import Welcome from "../../components/welcome/Welcome";
import { authService } from "../../services/AuthService.js";
import {message} from "antd";
import { storageKeys } from "../../config/config.js";
import { storageService } from "../../services/StorageService.js";
import { useAdminData } from "../../context/AdminContex.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { refreshAdminData } = useAdminData();
  const [errorMsg, setErrorMsg] = useState();

  const onSubmit = (formData) => {
    authService
      .login(formData?.email, formData?.password)
      .then(async (r) => {
        message.success("Succesfully logged in!");
        storageService.set(storageKeys.USER, r.getToken());
        await refreshAdminData();
        setTimeout(() => {
          navigate("/dashboard");
        }, 300);
      })
      .catch((err) => {
          setErrorMsg(err?.response.data);     
      });
  };

  return (
    <Welcome component={<LoginValidation onSubmit={onSubmit} errorMsg={errorMsg}/>}/>
  );
};

export default Login;
