import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );

    const [refreshToken, setRefreshToken] = useState(
        localStorage.getItem("refreshToken") || ""
    );

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(true);

    const login = (response) => {
        const userData = {
            userId: response.userId,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            role: response.role,
        };

        setToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        setUser(userData);

        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setToken("");
        setRefreshToken("");
        setUser(null);

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    };

    const isAuthenticated = () => token !== "";
    const isAdmin = () => user?.role === "Admin";
    const isRentalAgent = () => user?.role === "RentalAgent";
    const isCustomer = () => user?.role === "Customer";

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedRefresh = localStorage.getItem("refreshToken");
        const savedUser = localStorage.getItem("user");

        if (savedToken) {
            setToken(savedToken);
        }

        if (savedRefresh) {
            setRefreshToken(savedRefresh);
        }

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        setLoading(false);
    }, []);

    const value = { token, refreshToken, user, login, logout, isAuthenticated, isAdmin,
        isRentalAgent, isCustomer, setToken, setRefreshToken, setUser,};

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}