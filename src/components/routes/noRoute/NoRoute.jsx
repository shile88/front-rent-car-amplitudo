import { Link } from "react-router-dom"
import classes from './NoRoute.module.scss'

const NoRoute = () => {
  return (
    <div className={classes['noroute-wrapper']}>
      <h1>SORRY</h1>
      <h2>we couldnt find that page</h2>
      <p>Loggin and check our app  <Link to='/login'>here</Link></p>
    </div>
  )
}

export default NoRoute