import Client from "../pages/client/Client";
import { Navigate } from "react-router-dom";
import { useUserData } from "../context/UserContex";

const withAuth = (Component) => {
    return (props) => {
        const {userData} = useUserData();
        console.log(userData)
        if(userData?.id && userData?.role === 1)
            return  <Component {...props}/>
        if(userData?.id && userData?.role === 2)
            return <Client {...props} />
        if(userData === null)
            return  <Navigate to="/login" replace={true} />
    }
}

export default withAuth;