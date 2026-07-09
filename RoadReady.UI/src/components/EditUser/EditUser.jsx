import { useEffect, useState } from "react";
import { updateUser } from "../../api/userApi";
import "./EditUser.css";

function EditUser({ user, onClose }) {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        role: "",
        isActive: true
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (user) {

            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                role: user.role || "",
                isActive: user.isActive
            });

        }

    }, [user]);

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]:
                name === "isActive"
                    ? value === "true"
                    : value
        }));

    }

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        try {

            setLoading(true);

            await updateUser(user.userId, formData);

            alert("✅User updated successfully.");

            onClose();

        }
        catch (error) {

            setError(error.message);

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <div className="edit-user-overlay">

            <div className="edit-user-container">

                <h2>Edit User</h2>

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="Customer">Customer</option>
                        <option value="RentalAgent">Rental Agent</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <select
                        name="isActive"
                        value={formData.isActive.toString()}
                        onChange={handleChange}
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>

                    <div className="button-group">

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update User"}
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default EditUser;