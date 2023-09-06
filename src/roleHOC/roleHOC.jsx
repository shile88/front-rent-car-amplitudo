import Client from "../pages/client/Client";
import Customer from "../pages/customer/Customer";
import { useAdminData } from "../context/AdminContex";

const withRole = (Component) => {
    return (props) => {
        const {adminData} = useAdminData();

        return adminData?.role === 1 ? <Component {...props}/> : <Client />
    }
    
}

export default withRole;