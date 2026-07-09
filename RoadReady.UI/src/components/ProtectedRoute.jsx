import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRoles = [] }) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (
        allowedRoles.length > 0 &&
        (!user || !allowedRoles.includes(user.role))
    ) {
        return (
            <div style={{ display: "flex",justifyContent: "center",
                    alignItems: "center",flexDirection: "column",height: "100vh",
                    background: "#f8fafc",textAlign: "center",}}>
                <h1 style={{ fontSize: "72px", color: "#dc2626",marginBottom: "10px",}}>
                    403
                </h1>

                <h2 style={{ color: "#1e293b", marginBottom: "10px", }} >
                    Access Denied
                </h2>

                <p style={{ color: "#64748b",fontSize: "16px", }} >
                    You don't have permission to access this page.
                </p>

            </div>
        );
    }

    return <Outlet />;
}

export default ProtectedRoute;