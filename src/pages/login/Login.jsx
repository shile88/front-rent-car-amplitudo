import HeroCar from "../../assets/images/main-car.png";
import LoginValidation from "../../validation/loginValidation/LoginValidation";
import { authService } from "../../services/AuthService.js";
import classes from "./Login.module.scss";
import { message } from "antd";
import { storageKeys } from "../../config/config.js";
import { storageService } from "../../services/StorageService.js";
import { useState } from "react";
import { useUserData } from "../../context/UserContext.jsx";

const Login = () => {
  const { refreshUserData } = useUserData();
  const [loginErrorMsg, setLoginErrorMsg] = useState();
  const [loggingStatus, setLoggingStatus] = useState(false);

  const onSubmit = (formData) => {
    setLoggingStatus(true)
    authService
      .login(formData?.email, formData?.password)
      .then(async (r) => {
        message.success("Succesfully logged in!");
        storageService.set(storageKeys.USER, r.getToken());
        await refreshUserData();
        setLoggingStatus(false)
      })
      .catch((err) => {
       
        setLoginErrorMsg(err?.response.data);
        setLoggingStatus(false)
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
          <LoginValidation onSubmit={onSubmit} loginErrorMsg={loginErrorMsg} loggingStatus={loggingStatus}/>
        </div>
      </div>
      <div className={classes["car-wrapper"]}>
        <img src={HeroCar} alt="car-img" className={classes["car-img"]} />
      </div>
    </div>
  );
};

export default Login;
