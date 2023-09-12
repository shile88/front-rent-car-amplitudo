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
import { getStatusClassNames } from "antd/es/_util/statusUtils";
import { storageService } from "../../../services/StorageService";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../../context/UserContex";

function DropDown() {
  const navigate = useNavigate();
  const { refreshUserData } = useUserData();
  const handleMenuClick = (item) => {
    if (item.key === "logout") {
      setTimeout(() => {
        storageService.clear();
        refreshUserData();
        navigate("/login");
      }, 500);
    } else {
      navigate(`/${item.key}`);
    }
  };

  return (
    <Menu
      mode="horizontal"
      onClick={handleMenuClick}
      subMenuCloseDelay="0.2"
      className='dropdown'
      items={[
        {
          label: <UserOutlined />,
          key: "dropdown",
          children: [
            {
              label: "Add new customer",
              icon: <UserAddOutlined />,
              key: "users",
            },
            {
              label: "Add new car",
              icon: <CarOutlined />,
              key: "vehicles",
            },
            {
              label: "Add new reservation",
              icon: <SmileOutlined />,
              key: "reservations/add",
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
              danger: true
            },
          ],
        },
      ]}
    />
  );
}

export default DropDown;
