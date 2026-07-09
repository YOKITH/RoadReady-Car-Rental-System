import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function LoginForm() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));

    }

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        if (!formData.email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!formData.password.trim()) {
            setError("Password is required.");
            return;
        }

        try {

            setLoading(true);

            const response = await loginUser(formData);

            login(response);

            if (response.role === "Admin") {

                navigate("/admin/manage-cars");

            }
            else if (response.role === "RentalAgent") {

                navigate("/rental-agent/dashboard");

            }
            else {

                navigate("/");

            }

        }
        catch (error) {

            setError(error.message);

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <form
            className="login-form"
            onSubmit={handleSubmit}
            autoComplete="off"
        >

            <h2 className="login-title">
                Welcome Back
            </h2>

            <p className="login-subtitle">
                Sign in to continue your RoadReady journey.
            </p>

            {
                error &&

                <div className="login-error">
                    {error}
                </div>
            }

            <div className="form-group">

                <label className="form-label">
                    Email Address
                </label>

                <div className="custom-input">

                    {/* <i className="bi bi-envelope-fill"></i> */}

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                </div>

            </div>

            <div className="form-group">

                <label className="form-label">
                    Password
                </label>

                <div className="custom-input">

                    {/* <i className="bi bi-lock-fill"></i> */}

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                </div>

            </div>

            <button
                type="submit"
                className="login-btn"
                disabled={loading}
            >

                {
                    loading
                        ? "Signing In..."
                        : "Login"
                }

            </button>

            <div className="register-link">

                Don't have an account?

                <Link to="/register">

                    Register

                </Link>

            </div>

        </form>

    );

}

export default LoginForm;