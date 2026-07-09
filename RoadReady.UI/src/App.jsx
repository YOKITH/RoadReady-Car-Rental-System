import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import RentalAgentLayout from "./layouts/RentalAgentLayout";

//Common Pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Cars from "./pages/Cars/Cars";
import CarDetails from "./pages/CarDetails/CarDetails";
import Reservations from "./pages/Reservations/Reservations";
import CreateReservation from "./pages/CreateReservation/CreateReservation";
import PaymentHistoryPage from "./pages/Payments/PaymentHistory";
import MakePayment from "./pages/MakePayment/MakePayment";
import Profile from "./pages/Profile/Profile";

// Admin Pages
import ManageCars from "./pages/Admin/ManageCars";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageReservations from "./pages/Admin/ManageReservations";
import ShowPayments from "./pages/Admin/ShowPayments";
import Reports from "./pages/Admin/Reports/Reports";

//Rental Agent Pages
import RentalAgentDashboard from "./pages/RentalAgent/Dashboard/RentalAgentDashboard";
import CheckIn from "./pages/RentalAgent/CheckIn/CheckIn";
import CheckOut from "./pages/RentalAgent/CheckOut/CheckOut";
import RentalMaintenance from "./pages/RentalAgent/Maintenance/Maintenance";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={["Customer", "RentalAgent", "Admin"]}
                    />
                }
            >
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/cars/:id" element={<CarDetails />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route
                    path="/reservations/create"
                    element={<CreateReservation />}
                />
                <Route path="/payments" element={<PaymentHistoryPage />} />
                <Route path="/payments/make" element={<MakePayment />} />
                <Route path="/profile" element={<Profile />} />

            </Route>


            {/* Admin Routing */}
            <Route element={ <ProtectedRoute allowedRoles={["Admin"]} /> } >

                <Route path="/admin" element={<AdminLayout />}>

                    <Route index element={<Navigate to="manage-cars" replace />} />

                    <Route path="manage-cars" element={<ManageCars />} />

                    <Route path="manage-users" element={<ManageUsers />} />
                    <Route path="manage-reservations" element={<ManageReservations />} />
                    <Route path="show-payments" element={<ShowPayments />} />

                    <Route path="reports" element={<Reports />} />
                </Route>
            </Route>


            {/* RentalAgent Routes */}

            <Route element={ <ProtectedRoute allowedRoles={["RentalAgent"]} /> } >

                <Route path="/rental-agent" element={<RentalAgentLayout />} >

                    <Route index element={<Navigate to="dashboard" replace />} />

                    <Route path="dashboard" element={<RentalAgentDashboard />} />
                    <Route path="check-in" element={<CheckIn />} />
                    <Route path="check-out" element={<CheckOut />} />
                    <Route path="maintenance" element={<RentalMaintenance />} />
                </Route>
            </Route>

            <Route
                path="*" element={
                    <div
                        style={{
                            display: "flex", justifyContent: "center", alignItems: "center",
                            flexDirection: "column", height: "100vh", }} >
                        <h1>404</h1>
                        <h3>Page Not Found</h3>
                    </div> }
            />
        </Routes>
    );
}

export default App;