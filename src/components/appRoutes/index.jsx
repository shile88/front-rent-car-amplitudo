import { Route, Routes } from "react-router-dom";

import AddCustomer from "../../pages/users/addCustomer/AddCustomer";
import AddReservation from "../../pages/reservations/addReservation/AddReservation";
import Client from "../../pages/client/Client";
import Dashboard from "../../pages/dashboard/Dashboard";
import Login from "../../pages/login/Login";
import NoRoute from "../noRoute/NoRoute";
import ProtectedRoutes from "../../authHOC/ProtectedRoutes";
import Reservations from "../../pages/reservations/Reservations";
import Users from "../../pages/users/Users";
import Vehicles from "../../pages/vehicles/Vehicles";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add-customer" element={<AddCustomer />} />
        <Route path="/client" element={<Client />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/add" element={<AddReservation />} />
      </Route>
      <Route path="*" element={<NoRoute />} />
    </Routes>
  );
};

export default AppRoutes;
