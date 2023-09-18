import "./Sidebar.scss";

import { CarOutlined, CarryOutOutlined, UserOutlined } from "@ant-design/icons";

import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  return (
      <Menu
        className="sidebar-menu"
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: t('sidebar.users'),
            key: "/users",
            icon: <UserOutlined />,
          },
          {
            label: t('sidebar.vehicles'),
            key: "/vehicles",
            icon: <CarOutlined />,
          },
          {
            label: t('sidebar.reservations'),
            key: "/reservations",
            icon: <CarryOutOutlined />,
          },
        ]}
      ></Menu>
  );
};

export default Sidebar;
