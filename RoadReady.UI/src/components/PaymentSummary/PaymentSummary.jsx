import "./PaymentSummary.css";

function PaymentSummary({ reservation }) {
    if (!reservation) {
        return null;
    }

    const carBrand = reservation.car?.brand ?? reservation.carBrand;
    const carModel = reservation.car?.model ?? reservation.carModel;
    const location = reservation.car?.location ?? reservation.location;

    return (
        <div className="payment-summary">
            <h2 className="summary-title"> Reservation Summary </h2>

            <div className="summary-grid">
                <div className="summary-item">
                    <span className="label">Reservation ID</span>

                    <span className="value"> {reservation.reservationId} </span>
                </div>

                <div className="summary-item">
                    <span className="label">Car</span>

                    <span className="value"> {carBrand} {carModel} </span>
                </div>

                <div className="summary-item">
                    <span className="label">Pickup Date</span>
                    <span className="value">
                        {new Date(reservation.pickupDate).toLocaleDateString()}
                    </span>

                </div>

                <div className="summary-item">
                    <span className="label">Dropoff Date</span>
                    <span className="value">
                        {new Date(reservation.dropoffDate).toLocaleDateString()}
                    </span>
                </div>

                <div className="summary-item">
                    <span className="label">Location</span>
                    <span className="value"> {location} </span>
                </div>

                <div className="summary-item">
                    <span className="label">Status</span>

                    <span
                        className={
                            reservation.status === "Confirmed"
                                ? "payment-status confirmed" : reservation.status === "Cancelled"
                                    ? "payment-status cancelled" : "payment-status pending"
                        } > {reservation.status}
                    </span>
                </div>
            </div>
            <div className="amount-section">

                <h3> Total Amount </h3>

                <h1> ₹{reservation.totalAmount} </h1>

            </div>
        </div>
    );
}
export default PaymentSummary;