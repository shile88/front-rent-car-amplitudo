import { Navigate, Outlet } from "react-router-dom";

import NavBar from "../../navBar/NavBar";
import { useUserData } from "../../../context/UserContext";

const ClientRoutes = () => {
  const { userData } = useUserData();

  if (!userData) return <Navigate to="/login" />;
  if (userData && userData.role_id === 2)
    return (
      <>
        <NavBar />
        <Outlet />
      </>
    );
  if (userData && userData.role_id !== 2) return <Navigate to="/no-access" />;
};

export default ClientRoutes;
