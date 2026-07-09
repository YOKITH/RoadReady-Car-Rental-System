import { useEffect, useState } from "react";
import { getReservationsByUser } from "../../api/reservationApi";
import { useAuth } from "../../context/AuthContext";
import "./UserReservations.css";

function UserReservations() {
    const { user } = useAuth();

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            loadReservations();
        }
    }, [user]);

    async function loadReservations() {
        try {
            const response = await getReservationsByUser(
                user.userId
            );

            setReservations(response);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="user-reservations">
                <h2>My Reservations</h2>
                <p>Loading reservations...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="user-reservations">
                <h2>My Reservations</h2>
                <p className="error">{error}</p>
            </div>
        );
    }

    return (
        <div className="user-reservations">
            <h2>My Reservations</h2>

            {reservations.length === 0 ? (
                <div className="empty-message">
                    No reservations found.
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Car</th>
                            <th>Pickup</th>
                            <th>Dropoff</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.reservationId}>
                                <td>{reservation.reservationId}</td>

                                <td>
                                    {reservation.carName ||
                                        reservation.carId}
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
                                    <span
                                        className={`reservation-status ${
                                            reservation.status
                                                ?.toLowerCase()
                                                .replace(/\s+/g, "-") ||
                                            "default"
                                        }`}
                                    >
                                        {reservation.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UserReservations;