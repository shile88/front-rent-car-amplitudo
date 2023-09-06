import "./DropDown.scss";

import {
  CarOutlined,
  DownOutlined,
  LogoutOutlined,
  SmileOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function DropDown() {
  const navigate = useNavigate();
  const handleMenuClick = (item) => {
    navigate(`/${item.key}`);
  };

  return (
    <Menu
      mode="horizontal"
      onClick={handleMenuClick}
      subMenuCloseDelay="0.2"
      items={[
        {
          label: <UserOutlined />,
          key: "dropdown",
          children: [
            {
              label: "Add new customer",
              icon: <UserAddOutlined />,
              key: "admin/all-customers",
            },
            {
              label: "Add new car",
              icon: <CarOutlined />,
              key: "cars",
            },
            {
              label: "Add new reservation",
              icon: <SmileOutlined />,
              key: "reservation",
            },
            {
              label: "Change language",
              icon: <DownOutlined />,
              key: "",
            },
            {
              label: "Logout",
              icon: <LogoutOutlined />,
              key: "logout",
            },
          ],
        },
      ]}
    />
  );
}

export default DropDown;
