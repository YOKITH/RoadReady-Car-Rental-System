import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const { user, logout, isAuthenticated } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav className="navbar">

            <div className="navbar-logo">

                <Link to="/home">
                    🚗 RoadReady
                </Link>

            </div>

            <ul className="navbar-links">

                <li>

                    <Link to="/home">
                        Home
                    </Link>

                </li>

                <li>

                    <Link to="/cars">
                        Cars
                    </Link>

                </li>

                {
                    isAuthenticated() &&
                    (
                        <>

                            <li>

                                <Link to="/reservations">
                                    Reservations
                                </Link>

                            </li>

                            <li>

                                <Link to="/payments">
                                    Payments
                                </Link>

                            </li>

                            <li>

                                <Link to="/about">
                                    About
                                </Link>

                            </li>

                        </>
                    )
                }

            </ul>

            <div className="navbar-right">

                {
                    !isAuthenticated()

                        ? (

                            <>

                                <Link
                                    className="nav-btn login-btn"
                                    to="/login"
                                >
                                    Login
                                </Link>

                                <Link
                                    className="nav-btn register-btn"
                                    to="/register"
                                >
                                    Register
                                </Link>

                            </>

                        )

                        : (

                            <>

                                <span className="user-name">

                                    Welcome,

                                    <strong>
                                        {" "}
                                        {user.firstName}
                                    </strong>

                                </span>

                                {
                                    user.role === "Admin" &&

                                    (

                                        <Link
                                            className="dashboard-btn"
                                            to="/admin/dashboard"
                                        >
                                            Dashboard
                                        </Link>

                                    )
                                }

                                {
                                    user.role === "RentalAgent" &&

                                    (

                                        <Link
                                            className="dashboard-btn"
                                            to="/rental-agent/dashboard"
                                        >
                                            Dashboard
                                        </Link>

                                    )
                                }

                                {
                                    user.role === "Customer" &&

                                    (

                                        <Link
                                            className="dashboard-btn"
                                            to="/profile"
                                        >
                                            Profile
                                        </Link>

                                    )
                                }

                                <button
                                    className="logout-btn"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                            </>

                        )
                }

            </div>

        </nav>

    );

}

export default Navbar;