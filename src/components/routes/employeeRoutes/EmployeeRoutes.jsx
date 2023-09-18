import { Navigate, Outlet } from "react-router-dom";

import { useUserData } from "../../../context/UserContext";

const EmployeeRoutes = () => {
  const { userData } = useUserData();
  
  if (!userData) return <Navigate to="/login" />;
  if (userData && userData.role_id === 1) return <Outlet />;
  if (userData && userData.role_id !== 1) return <Navigate to="/no-access" />;
 
};

export default EmployeeRoutes;
