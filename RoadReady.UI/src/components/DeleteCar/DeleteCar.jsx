import { useState } from "react";

import { deleteCar } from "../../api/carApi";

import "./DeleteCar.css";

function DeleteCar({ car, onClose}) 
{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleDelete() {
        setError("");
        try {
            setLoading(true);
            await deleteCar(car.carId);
            alert("✅ Car deleted successfully.");

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
        <div className="delete-car-overlay">
            <div className="delete-car-container">

                <h2> Delete Car </h2>
                {
                    error &&
                    <p className="error"> {error} </p>

                }

                <p className="delete-message">
                    Are you sure you want to delete
                    <strong> {" "} {car.brand} {car.model} </strong> ?
                </p>

                <div className="button-group">
                    <button className="delete-btn" onClick={handleDelete}
                        disabled={loading} >
                        {
                            loading ? "Deleting..." : "Delete"
                        }
                    </button>
                    <button className="cancel-btn" onClick={onClose} >
                        Cancel </button>
                </div>
            </div>
        </div>
    );
}
export default DeleteCar;