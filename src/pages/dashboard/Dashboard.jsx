import { Image, Space, Typography } from "antd";

import BgShape from "../../assets/images/hero-bg.png";
import HeroCar from "../../assets/images/main-car.png";
import classes from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={classes.dashboard}>
      <div className={classes['welcome-text']}> 
        <h1>Welcome </h1>
        <h2>
          Feel free to check our <span>amazing cars</span> for rent{" "}
        </h2>
      </div>
      <Image src={HeroCar} width={500} preview={false} />
    </div>
  );
};

export default Dashboard;
