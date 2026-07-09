import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import "./Register.css";

function RegisterForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;

    const getPasswordStrength = (password) => {

        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[@$!%*?&^#()_\-+=]/.test(password)) score++;

        if (score <= 2)
            return { text: "Weak", color: "#ef4444" };

        if (score <= 4)
            return { text: "Medium", color: "#f59e0b" };

        return { text: "Strong", color: "#22c55e" };

    };

    const strength = getPasswordStrength(formData.password);

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

    }

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        setSuccess("");

        if (!formData.firstName.trim()) {
            setError("First Name is required.");
            return;
        }

        if (!formData.lastName.trim()) {
            setError("Last Name is required.");
            return;
        }

        if (!formData.email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!formData.phoneNumber.trim()) {
            setError("Phone Number is required.");
            return;
        }

        if (!formData.password.trim()) {
            setError("Password is required.");
            return;
        }

        if (!passwordRegex.test(formData.password)) {

            setError(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
            );

            return;

        }

        if (!formData.confirmPassword.trim()) {
            setError("Confirm Password is required.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            setLoading(true);

            await registerUser(formData);

            setSuccess("Registration successful. Redirecting to Login...");

            setTimeout(() => {

                navigate("/login");

            }, 2000);

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
            className="register-form"
            onSubmit={handleSubmit}
            autoComplete="off"
        >

            <h2 className="register-title">
                Create Account
            </h2>

            <p className="register-subtitle">
                Join RoadReady and start renting cars today.
            </p>

            {

                error &&

                <div className="register-error">

                    {error}

                </div>

            }

            {

                success &&

                <div className="register-success">

                    {success}

                </div>

            }

            <div className="register-row">

                <div className="form-group">

                    <label className="form-label">

                        First Name

                    </label>

                    <div className="custom-input">

                        {/* <i className="bi bi-person-fill"></i> */}

                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label className="form-label">

                        Last Name

                    </label>

                    <div className="custom-input">

                        {/* <i className="bi bi-person-fill"></i> */}

                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />

                    </div>

                </div>

            </div>

            <div className="form-group">

                <label className="form-label">

                    Email Address

                </label>

                <div className="custom-input">

                    {/* <i className="bi bi-envelope-fill"></i> */}

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                </div>

            </div>

            <div className="form-group">

                <label className="form-label">

                    Phone Number

                </label>

                <div className="custom-input">

                    {/* <i className="bi bi-telephone-fill"></i> */}

                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
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
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                </div>

                {

                    formData.password &&

                    <div
                        className="password-strength"
                        style={{ color: strength.color }}
                    >

                        Password Strength : <strong>{strength.text}</strong>

                    </div>

                }

                <div className="password-rules">

                    <strong>Password must contain:</strong>

                    <ul>

                        <li>Minimum 8 characters</li>

                        <li>One uppercase letter (A-Z)</li>

                        <li>One lowercase letter (a-z)</li>

                        <li>One number (0-9)</li>

                        <li>One special character (@,#,$,%,&,etc.)</li>

                    </ul>

                </div>

            </div>

            <div className="form-group">

                <label className="form-label">

                    Confirm Password

                </label>

                <div className="custom-input">

                    {/* <i className="bi bi-lock-fill"></i> */}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                </div>

            </div>

            <button
                type="submit"
                className="register-btn"
                disabled={loading}
            >

                {

                    loading

                        ? "Creating Account..."

                        : "Register"

                }

            </button>

            <div className="login-link">

                Already have an account?

                <Link to="/login">

                    Login

                </Link>

            </div>

        </form>

    );

}

export default RegisterForm;