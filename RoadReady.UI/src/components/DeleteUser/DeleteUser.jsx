import { useState } from "react";

import { deleteUser } from "../../api/userApi";

import "./DeleteUser.css";

function DeleteUser({

    user,

    onClose

}) {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleDelete() {

        setError("");

        try {

            setLoading(true);

            await deleteUser(user.userId);

            alert("✅User deleted successfully.");

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

        <div className="delete-user-overlay">

            <div className="delete-user-container">

                <h2>

                    Delete User

                </h2>

                {

                    error &&

                    <p className="error">

                        {error}

                    </p>

                }

                <p className="delete-message">

                    Are you sure you want to delete

                    <strong>

                        {" "}
                        {user.firstName} {user.lastName}

                    </strong>

                    ?

                </p>

                <div className="button-group">

                    <button

                        className="delete-btn"

                        onClick={handleDelete}

                        disabled={loading}

                    >

                        {

                            loading

                                ?

                                "Deleting..."

                                :

                                "Delete"

                        }

                    </button>

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteUser;