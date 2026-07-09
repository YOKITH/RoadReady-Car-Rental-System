import { useNavigate } from "react-router-dom";

import "./ReservationCard.css";

function ReservationCard({ reservation, onCancel }) {

    const navigate = useNavigate();

    function handlePayment() {

        navigate("/payments/make", {
            state: {
                reservation
            }
        });

    }

    return (

        <div className="reservation-card">

            <div className="reservation-header">

                <div>

                    <h2>

                        {reservation.car?.brand} {reservation.car?.model}

                    </h2>

                    <p>

                        Reservation #{reservation.reservationId}

                    </p>

                </div>

                <span
    className={`reservation-card-status ${
        reservation.status
            ?.toLowerCase()
            .replace(/\s+/g, "-") || "default"
    }`}
>
    {reservation.status}
</span>

            </div>

            <div className="reservation-body">

                <div className="detail">

                    <span>Pickup Date</span>

                    <strong>

                        {new Date(
                            reservation.pickupDate
                        ).toLocaleDateString()}

                    </strong>

                </div>

                <div className="detail">

                    <span>Dropoff Date</span>

                    <strong>

                        {new Date(
                            reservation.dropoffDate
                        ).toLocaleDateString()}

                    </strong>

                </div>

                <div className="detail">

                    <span>Total Amount</span>

                    <strong>

                        ₹{reservation.totalAmount}

                    </strong>

                </div>

                <div className="detail">

                    <span>Booked On</span>

                    <strong>

                        {new Date(
                            reservation.createdAt
                        ).toLocaleDateString()}

                    </strong>

                </div>

            </div>

            {

                reservation.status === "Pending" && (

                    <div className="reservation-footer">

                        <button
                            className="pay-button"
                            onClick={handlePayment}
                        >
                            Pay Now
                        </button>

                        <button
                            className="cancel-button"
                            onClick={() =>
                                onCancel(reservation.reservationId)
                            }
                        >
                            Cancel Reservation
                        </button>

                    </div>

                )

            }

        </div>

    );

}

export default ReservationCard;