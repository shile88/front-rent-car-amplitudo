import { Route, Routes } from "react-router-dom"

import AddCustomer from "../../pages/users/addCustomer/AddCustomer"
import AddReservation from "../../pages/reservations/addReservation/AddReservation"
import Customer from "../../pages/customer/Customer"
import Dashboard from "../../pages/dashboard/Dashboard"
import Login from "../../pages/login/Login"
import Reservations from "../../pages/reservations/Reservations"
import Users from "../../pages/users/Users"
import Vehicles from "../../pages/vehicles/Vehicles"
import withAuth from "../../authHOC/authHOC"
import withRole from "../../roleHOC/roleHOC"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add-customer" element={<AddCustomer />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/add" element={<AddReservation />} />
    </Routes>  
  )
}

export default withRole(withAuth(AppRoutes))