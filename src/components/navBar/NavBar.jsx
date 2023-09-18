import { Image, Space, Typography } from "antd";

import DropDown from "./dropDown/DropDown";
import Logo from "../../assets/images/logo.png";
import classes from "./NavBar.module.scss";
import { useUserData } from "../../context/UserContext";

function NavBar({t, handleChangeLanguage}) {
  const { userData } = useUserData();

  return (
    <header className={classes.header}>
      <Image width={150} src={Logo} preview={false}/>
      
      <Space>
        <Typography.Title className={classes['header-name']}>
          {userData?.first_name} {userData?.last_name}
        </Typography.Title>

        <DropDown t={t} handleChangeLanguage={handleChangeLanguage}/>
      </Space>
    </header>
  );
}

export default NavBar;
