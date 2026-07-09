import "./ReservationTable.css";

function ReservationTable({
    reservations,
    onView,
    onStatus,
}) {

    // Hide completed reservations
    const activeReservations = reservations.filter(
        (reservation) =>
            reservation.status?.toLowerCase() !== "completed"
    );

    if (activeReservations.length === 0) {
        return (
            <div className="empty-reservations">
                No reservations found.
            </div>
        );
    }

    return (
        <div className="reservation-table-container">
            <table className="reservation-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Car</th>
                        <th>Pickup Date</th>
                        <th>Dropoff Date</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {activeReservations.map((reservation) => (
                        <tr key={reservation.reservationId}>
                            <td>{reservation.reservationId}</td>

                            <td>
                                {reservation.user?.firstName}{" "}
                                {reservation.user?.lastName}
                            </td>

                            <td>
                                {reservation.car?.brand}{" "}
                                {reservation.car?.model}
                            </td>

                            <td>
                                {new Date(
                                    reservation.pickupDate
                                ).toLocaleDateString()}
                            </td>

                            <td>
                                {new Date(
                                    reservation.dropoffDate
                                ).toLocaleDateString()}
                            </td>

                            <td>₹{reservation.totalAmount}</td>

                            <td>
                                {(() => {
                                    const displayStatus =
                                        !reservation.status ||
                                        reservation.status.trim() === ""
                                            ? "Ongoing"
                                            : reservation.status.toLowerCase() === "active"
                                            ? "Ongoing"
                                            : reservation.status;

                                    return (
                                        <span
                                            className={`reservation-status ${displayStatus
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")}`}
                                        >
                                            {displayStatus}
                                        </span>
                                    );
                                })()}
                            </td>

                            <td>
                                <button
                                    className="view-btn"
                                    onClick={() => onView(reservation)}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReservationTable;