import BgShape from "../../assets/images/hero-bg.png";
import HeroCar from "../../assets/images/main-car.png";
import LoginValidation from "../../validation/loginValidation/LoginValidation";
import { authService } from "../../services/AuthService.js";
import classes from "./Login.module.scss";
import { message } from "antd";
import { storageKeys } from "../../config/config.js";
import { storageService } from "../../services/StorageService.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserData } from "../../context/UserContex.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { refreshUserData } = useUserData();
  const [errorMsg, setErrorMsg] = useState();

  const onSubmit = (formData) => {
    authService
      .login(formData?.email, formData?.password)
      .then(async (r) => {
        message.success("Succesfully logged in!");
        storageService.set(storageKeys.USER, r.getToken());
        await refreshUserData();
        navigate("/dashboard");
      })
      .catch((err) => {
        setErrorMsg(err?.response.data);
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes["login-form"]}>
        <div className={classes['login-text']}>
          <h4>Plan your trip now</h4>
          <h1>
            Save <span>big</span> with our car rental
          </h1>
          <LoginValidation onSubmit={onSubmit} errorMsg={errorMsg} />
        </div>
      </div>
      <div className={classes["car-wrapper"]}>
        <img src={HeroCar} alt="car-img" className={classes["car-img"]} />
      </div>
    </div>
  );
};

export default Login;
