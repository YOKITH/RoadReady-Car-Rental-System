import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import fleetBg from "../Images/fleet-bg.png";
import "./AdminLayout.css";

function AdminLayout() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    function handleLogout() {

        logout();

        navigate("/login");

    }

    return (

        <div
            className="admin-layout"
            style={{
                backgroundImage: `
                    linear-gradient(
                        rgba(15,23,42,0.65),
                        rgba(15,23,42,0.65)
                    ),
                    url(${fleetBg})
                `
            }}
        >

            <header className="admin-navbar">

                <div className="admin-logo">
                    🚗 <span>RoadReady</span>
                </div>

                <nav className="admin-nav">

                    <NavLink to="/admin/manage-cars">
                        Manage Cars
                    </NavLink>

                    <NavLink to="/admin/manage-users">
                        Manage Users
                    </NavLink>

                    <NavLink to="/admin/manage-reservations">
                        Reservations
                    </NavLink>

                    <NavLink to="/admin/show-payments">
                        Show Payments
                    </NavLink>

                    <NavLink to="/admin/reports">
                        Reports
                    </NavLink>

                    <NavLink to="/cars">
                        View Cars
                    </NavLink>

                    <NavLink to="/profile">
                        Profile
                    </NavLink>

                </nav>

                <button
                    type="button"
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </header>

            <main className="admin-content">

                <header className="admin-header">

                    <h1>
                        Admin Panel
                    </h1>

                </header>

                <div className="admin-body">

                    <Outlet />

                </div>

            </main>

        </div>

    );

}

export default AdminLayout;