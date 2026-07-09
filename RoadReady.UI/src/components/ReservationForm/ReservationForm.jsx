import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createReservation } from "../../api/reservationApi";
import { useAuth } from "../../context/AuthContext";

import "./ReservationForm.css";

function ReservationForm({ car }) {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [formData, setFormData] = useState({
        pickupDate: "",
        dropoffDate: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const calculateTotalAmount = () => {

        if (!formData.pickupDate || !formData.dropoffDate)
            return 0;

        const pickup = new Date(formData.pickupDate);

        const dropoff = new Date(formData.dropoffDate);

        const difference = dropoff - pickup;

        const days = Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

        if (days <= 0)
            return 0;

        return days * car.pricePerDay;

    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!formData.pickupDate) {
            setError("Pickup date is required.");
            return;
        }

        if (!formData.dropoffDate) {
            setError("Dropoff date is required.");
            return;

        }
        if ( new Date(formData.pickupDate) >= new Date(formData.dropoffDate))
        {

            setError(
                "Dropoff date must be after Pickup date."
            );

            return;

        }

        try {

            setLoading(true);

            const reservationData = {

                userId: user.userId,

                carId: car.carId,

                pickupDate: formData.pickupDate,

                dropoffDate: formData.dropoffDate


            };

            // Create Reservation

            const response = await createReservation(
                reservationData
            );

            console.log("Reservation Response:", response);

            // Navigate to Payments Page

            navigate("/payments/make", {
                state: {
                    reservation:
                        response.reservation ??
                        response.Reservation
                }
            });

        }

        catch (error) {

            //setError(error.message);
            setError("The Pickup and Drop dates cannot be in Past");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="reservation-form-container">

            <h2>

                Reservation Details

            </h2>

            {

                error &&

                <div className="error-message">

                    {error}

                </div>

            }

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>

                        Pickup Date

                    </label>

                    <input
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>

                        Dropoff Date

                    </label>

                    <input
                        type="date"
                        name="dropoffDate"
                        value={formData.dropoffDate}
                        onChange={handleChange}
                    />

                </div>

                <div className="amount-box">

                    <h3>

                        Total Amount

                    </h3>

                    <span>

                        ₹ {calculateTotalAmount()}

                    </span>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                >

                    {

                        loading

                            ?

                            "Creating Reservation..."

                            :

                            "Reserve Now"

                    }

                </button>

            </form>

        </div>

    );

}

export default ReservationForm;