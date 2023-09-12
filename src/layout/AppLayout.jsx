import Footer from "../components/footer/Footer";
import NavBar from "../components/navBar/NavBar";
import Sidebar from "../components/sidebar/Sidebar";
import { Space } from "antd";
import classes from "./AppLayout.module.scss";
import { useUserData } from "../context/UserContex";

const AppLayout = ({ children }) => {
  const { userData } = useUserData();
  return (
    <div className={classes["app-wrapper"]}>
      {userData && <NavBar />}
      <div className={classes["sideMenu-PageContent-Wrapper"]}>
        {userData && <Sidebar />}
        <main className={classes["main-content"]}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
