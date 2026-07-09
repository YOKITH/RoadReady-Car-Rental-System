import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import fleetBg from "../Images/fleet-bg.png";
import "./RentalAgentLayout.css";

function RentalAgentLayout() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div
            className="rental-layout"
            style={{
                backgroundImage: `
                    linear-gradient(  rgba(15,23,42,0.65), rgba(15,23,42,0.65)
                    ), url(${fleetBg}) `,
            }} >
                
            <aside className="rental-sidebar">
                <div className="sidebar-logo">
                    <h2>🚗 RoadReady</h2>
                    <p>Rental Agent Panel</p>
                </div>

                <nav className="sidebar-nav">
                    <NavLink
                        to="/rental-agent/dashboard"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/rental-agent/check-in"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Vehicle Check-In
                    </NavLink>

                    <NavLink
                        to="/rental-agent/check-out"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Vehicle Check-Out
                    </NavLink>

                    <hr />

                    <NavLink to="/cars"
                        className={({ isActive }) => (isActive ? "active" : "")}>
                        View Cars </NavLink>

                    <NavLink to="/profile"
                        className={({ isActive }) => (isActive ? "active" : "")}>
                        My Profile
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <span>Logged in as</span>
                        <strong>
                            {user
                                ? `${user.firstName} ${user.lastName}` : "Rental Agent"}
                        </strong>
                    </div>

                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </aside>

            <main className="rental-content">
                <header className="rental-header">
                    <div>
                        <h1>Rental Agent Panel</h1>

                        <p> Manage vehicle check-ins, check-outs and maintenance.
                        </p>
                    </div>
                </header>

                <section className="rental-body">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}

export default RentalAgentLayout;