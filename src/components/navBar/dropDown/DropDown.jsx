import "./DropDown.scss";

import {
  CarOutlined,
  CarryOutOutlined,
  MenuOutlined,
  PoweroffOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { Menu } from "antd";
import { storageService } from "../../../services/StorageService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserData } from "../../../context/UserContext";

function DropDown() {
  const { t, i18n } = useTranslation("global");

  const [language, setLanguage] = useState(false);
  const navigate = useNavigate();
  const { refreshUserData, userData } = useUserData();
  const handleMenuClick = (item) => {
    if (item.key === "logout") {
      setTimeout(() => {
        storageService.clear();
        refreshUserData();
        navigate("/login");
      }, 500);
    } else if (item.key === "language") {
      setLanguage((prevState) => !prevState);
    } else {
      navigate(`/${item.key}`);
    }
  };

  useEffect(() => {
    language ? handleChangeLanguage("mne") : handleChangeLanguage("en");
  }, [language])

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Menu
      mode="horizontal"
      onClick={handleMenuClick}
      subMenuCloseDelay="0.3"
      className="dropdown"
      items={[
        {
          label: <MenuOutlined />,
          key: "dropdown",
          children: [
            {
              label: t("header.dropdown.addCustomer"),
              icon: <UserAddOutlined />,
              key: "users",
              disabled: userData.role_id === 2 ? true : false,
            },
            {
              label: t("header.dropdown.addVehicle"),
              icon: <CarOutlined />,
              key: "vehicles",
              disabled: userData.role_id === 2 ? true : false,
            },
            {
              label: t("header.dropdown.addReservation"),
              icon: <CarryOutOutlined />,
              key: "reservations/add",
              disabled: userData.role_id === 2 ? true : false,
            },
            {
              label: `${t("header.dropdown.changeLang")}-${
                language ? "EN" : "MNE"
              } `,
              key: "language",
            },
            {
              label: t("header.dropdown.logout"),
              icon: <PoweroffOutlined />,
              key: "logout",
              danger: true,
            },
          ],
        },
      ]}
    />
  );
}

export default DropDown;
