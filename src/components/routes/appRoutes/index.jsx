import { Route, Routes } from "react-router-dom";

import AddCustomer from "../../../pages/users/addCustomer/AddCustomer";
import AddReservation from "../../../pages/reservations/addReservation/AddReservation";
import Client from "../../../pages/client/Client";
import ClientRoutes from "../clientRoutes/ClientRoutes";
import Dashboard from "../../../pages/dashboard/Dashboard";
import EmployeeRoutes from "../employeeRoutes/EmployeeRoutes";
import FreeRoutes from "../freeRoutes/FreeRoutes";
import LayoutRoute from "../layoutRoute/LayoutRoute";
import Login from "../../../pages/login/Login";
import NoAccess from "../noAccess/NoAccess";
import NoRoute from "../noRoute/NoRoute";
import Reservations from "../../../pages/reservations/Reservations";
import Users from "../../../pages/users/Users";
import Vehicles from "../../../pages/vehicles/Vehicles";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<FreeRoutes />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<LayoutRoute />}>
        <Route element={<EmployeeRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add-customer" element={<AddCustomer />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/reservations/add" element={<AddReservation />} />
        </Route>

       
      </Route>
      <Route element={<ClientRoutes />}>
          <Route path="/client" element={<Client />} />
        </Route>
      <Route path="*" element={<NoRoute />} />
      <Route path="/no-access" element={<NoAccess />} />
    </Routes>
  );
};

export default AppRoutes;
