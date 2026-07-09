import { Outlet } from "react-router-dom";
import fleetBg from "../Images/fleet-bg.png";
import "./AuthLayout.css";

function AuthLayout() {
    return (
        <div
            className="auth-layout"
            style={{
                backgroundImage: `
                    linear-gradient( rgba(15,23,42,0.70), rgba(15,23,42,0.70)
                    ), url(${fleetBg}) `, }} >

            <div className="auth-container">
                <div className="auth-header">
                    <h1>🚗 RoadReady</h1>
                    <p>Car Rental Management System</p>
                </div>

                <div className="auth-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;