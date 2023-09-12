import { CarOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";

import { Menu } from "antd";
import classes from "./Sidebar.module.scss";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className={classes["side-menu-wrapper"]}>
      <Menu
        mode="vertical"
        className={classes['side-menu']}
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: "Users",
            key: "/users",
            icon: <UserOutlined />,
          },
          {
            label: "Vehicles",
            key: "/vehicles",
            icon: <CarOutlined />,
          },
          {
            label: "Reservations",
            key: "/reservations",
            icon: <UserAddOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
};

export default Sidebar;
