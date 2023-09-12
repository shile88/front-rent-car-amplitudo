import { Navigate, Outlet, useLocation } from "react-router-dom";

import Client from "../pages/client/Client";
import { useUserData } from "../context/UserContex";

const ProtectedRoutes = () => {
  const { userData } = useUserData();
  const location = useLocation();

  if (userData && (location.pathname === "/login" || location.pathname === "/") )
    return <Navigate to="/dashboard" />;
  if (userData?.role === 1 && (location.pathname !== "/login" || location.pathname !== "/")) return <Outlet />;
  if (userData?.role === 2) return <Client />;
  if (!userData) return <Navigate to="/login" />;
};

export default ProtectedRoutes;
