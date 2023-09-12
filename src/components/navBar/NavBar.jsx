import { Image, Space, Typography } from "antd";

import DropDown from "./dropDown/DropDown";
import Logo from "../../assets/images/logo.png";
import classes from "./NavBar.module.scss";
import { useUserData } from "../../context/UserContex";

function NavBar() {
  const { userData } = useUserData();

  return (
    <header className={classes.header}>
      <Image width={150} src={Logo} preview={false}/>

      <Space className={classes.name}>
        <Typography.Title className={classes.title}>
          {userData?.firstName} {userData?.lastName}
        </Typography.Title>

        <DropDown />
      </Space>
    </header>
  );
}

export default NavBar;
