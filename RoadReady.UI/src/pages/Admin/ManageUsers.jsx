import { useEffect, useState } from "react";

import { getAllUsers } from "../../api/userApi";

import UserTable from "../../components/UserTable/UserTable";
import EditUser from "../../components/EditUser/EditUser";
import DeleteUser from "../../components/DeleteUser/DeleteUser";

import "./ManageUsers.css";

function ManageUsers() {

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const [showEditUser, setShowEditUser] = useState(false);

    const [showDeleteUser, setShowDeleteUser] = useState(false);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadUsers();

    }, []);

    async function loadUsers() {

        try {

            setLoading(true);

            const response = await getAllUsers();

            console.log("========== USERS API ==========");
            console.log("API Response:", response);
            console.log("Is Array:", Array.isArray(response));
            console.log("Type:", typeof response);

            // If the API didn't return an array
            if (!Array.isArray(response)) {

                console.error("Expected an array but received:", response);

                setError("API did not return a valid users array.");

                setUsers([]);

                return;

            }

            // Hide Admin users
            const filteredUsers = response.filter(
                (user) => user.role !== "Admin"
            );

            console.log("Filtered Users:", filteredUsers);

            setUsers(filteredUsers);

        }

        catch (error) {

            console.error("Load Users Error:", error);

            setError(error.message);

        }

        finally {

            setLoading(false);

        }

    }

    function handleEditUser(user) {

        setSelectedUser(user);

        setShowEditUser(true);

    }

    function handleDeleteUser(user) {

        setSelectedUser(user);

        setShowDeleteUser(true);

    }

    console.log("Current Users State:", users);

    return (

        <div className="manage-users-page">

            <div className="manage-users-header">

                <h1>Manage Users</h1>

            </div>

            {

                loading ?

                    <p>Loading users...</p>

                :

                error ?

                    <p className="error">
                        {error}
                    </p>

                :

                    <UserTable
                        users={users}
                        onEdit={handleEditUser}
                        onDelete={handleDeleteUser}
                    />

            }

            {

                showEditUser &&

                <EditUser
                    user={selectedUser}
                    onClose={() => {

                        setShowEditUser(false);

                        loadUsers();

                    }}
                />

            }

            {

                showDeleteUser &&

                <DeleteUser
                    user={selectedUser}
                    onClose={() => {

                        setShowDeleteUser(false);

                        loadUsers();

                    }}
                />

            }

        </div>

    );

}

export default ManageUsers;