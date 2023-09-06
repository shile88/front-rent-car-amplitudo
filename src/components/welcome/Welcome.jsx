import BgShape from "../../assets/images/hero-bg.png";
import HeroCar from "../../assets/images/main-car.png";
import classes from './Welcome.module.scss';

const Welcome = ({component}) => {
  return (
    <>
      <section className={classes["hero-section"]}>
        <img className={classes["bg-shape"]} src={BgShape} alt="bg-shape" />
        <div className={classes["hero-content"]}>
          <div className={classes.form}>
            
              
              {component}
           
          </div>

          {/* img */}
          <img src={HeroCar} alt="car-img" className={classes["car-img"]} />
        </div>
      </section>
    </>
  )
}

export default Welcome