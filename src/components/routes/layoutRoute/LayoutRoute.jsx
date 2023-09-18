import Footer from "../../footer/Footer";
import NavBar from "../../navBar/NavBar";
import { Outlet } from "react-router-dom";
import SideBar from "../../sidebar/Sidebar";
import classes from "./LayoutRoute.module.scss";
import { useUserData } from "../../../context/UserContext";

const LayoutRoute = () => {
  const { userData } = useUserData();

  return (
    <div className={classes["app-wrapper"]}>
      <div className={classes.nav}>
        <NavBar />
      </div>

      {userData?.role_id === 1 && (
        <div className={classes.side}>
          <SideBar />
        </div>
      )}

      <div className={classes["main-content"]}>
        <Outlet />
      </div>

      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default LayoutRoute;
