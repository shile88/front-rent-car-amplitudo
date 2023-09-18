import { Navigate, Outlet } from "react-router-dom";

import { useUserData } from "../../../context/UserContext"

const FreeRoutes = () => {
    const {userData} = useUserData();
  
    if(userData && userData.role_id === 1) return <Navigate to={'/dashboard'}/>
    if(userData && userData.role_id === 2) return <Navigate to={'/client'}/>
    if(!userData) return <Outlet/>
}

export default FreeRoutes