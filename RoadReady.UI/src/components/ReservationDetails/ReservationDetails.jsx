import "./ReservationDetails.css";

function ReservationDetails({

    reservation,

    onClose

}) {

    if (!reservation) {

        return null;

    }

    return (

        <div className="reservation-details-overlay">

            <div className="reservation-details-container">

                <h2>

                    Reservation Details

                </h2>

                <div className="reservation-info">

                    <div className="info-item">

                        <strong>Reservation ID</strong>

                        <span>{reservation.reservationId}</span>

                    </div>

                    <div className="info-item">

                        <strong>Customer</strong>

                        <span>

                            {reservation.user?.firstName} {reservation.user?.lastName}

                        </span>

                    </div>

                    <div className="info-item">

                        <strong>Car</strong>

                        <span>

                            {reservation.car?.brand} {reservation.car?.model}

                        </span>

                    </div>

                    <div className="info-item">

                        <strong>Pickup Date</strong>

                        <span>

                            {new Date(reservation.pickupDate).toLocaleDateString()}

                        </span>

                    </div>

                    <div className="info-item">

                        <strong>Dropoff Date</strong>

                        <span>

                            {new Date(reservation.dropoffDate).toLocaleDateString()}

                        </span>

                    </div>

                    <div className="info-item">

                        <strong>Total Amount</strong>

                        <span>

                            ₹{reservation.totalAmount}

                        </span>

                    </div>

                    <div className="info-item">

                        <strong>Reservation Status</strong>

                        <span
                            className={`reservation-status ${
                                reservation.status
                                    ?.toLowerCase()
                                    .replace(/\s+/g, "-") || "default"
                            }`}
                        >

                            {reservation.status}

                        </span>

                    </div>

                </div>

                <button

                    className="close-btn"

                    onClick={onClose}

                >

                    Close

                </button>

            </div>

        </div>

    );

}

export default ReservationDetails;