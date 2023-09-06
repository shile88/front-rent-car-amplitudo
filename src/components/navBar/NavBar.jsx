import { Image, Space, Typography } from "antd";

import DropDown from "./dropDown/DropDown";
import Logo from "../../assets/images/logo.png";
import classes from "./NavBar.module.scss";
import { useAdminData } from "../../context/AdminContex";

function NavBar() {
  const { adminData } = useAdminData();

  return (
    <header className={classes.header}>
      <Image width={150} src={Logo} preview={false}/>

      <Space className={classes.name}>
        <Typography.Title type="warning" className={classes.title}>
          {adminData?.firstName} {adminData?.lastName}
        </Typography.Title>

        <DropDown />
      </Space>
    </header>
  );
}

export default NavBar;
