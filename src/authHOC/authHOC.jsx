import { Navigate } from "react-router-dom";
import { useAdminData } from "../context/AdminContex";

const withAuth = (Component) => {
    return (props) => {
        const {adminData} = useAdminData();

        return adminData?.id ?
            <Component {...props}/>
            :
            <Navigate to="/login" replace={true} />
    }
}

export default withAuth;