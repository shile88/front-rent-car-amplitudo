import { Link } from "react-router-dom";
import classes from "./NoAccess.module.scss";
import { useUserData } from "../../../context/UserContext";

const NoAccess = () => {
  const { userData } = useUserData();
  return (
    <div className={classes["noaccess-wrapper"]}>
      <h1>SORRY</h1>
      <h2>
        you dont have <span>access</span> to this page
      </h2>
      {userData.role_id === 2 ? (
        <p>
          Go to clients page <Link to="/clients">here</Link>
        </p>
      ) : (
        <p>
          Click and check app <Link to="/login">here</Link>
        </p>
      )}
    </div>
  );
};

export default NoAccess;
