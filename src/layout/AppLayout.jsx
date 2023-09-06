import Footer from "../components/footer/Footer";
import NavBar from "../components/navBar/NavBar";
import Sidebar from "../components/sidebar/Sidebar";
import { Space } from "antd";
import classes from "./AppLayout.module.scss";

const AppLayout = ({ children }) => {
  return (
    <div className={classes["app-wrapper"]}>
      <NavBar />
      <Space className={classes["sideMenuPageContentWrapper"]}>
        <Sidebar className={classes.side}/>
        {children}
      </Space>
      <Footer />
    </div>
  );
};

export default AppLayout;
