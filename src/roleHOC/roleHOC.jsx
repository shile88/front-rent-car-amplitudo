import Client from "../pages/client/Client";
import { useUserData } from "../context/UserContex";

const withRole = (Component) => {
    return (props) => {
        const {userData} = useUserData();

        return userData?.role === 1 ? <Component {...props}/> : <Client />
    }
    
}

export default withRole;