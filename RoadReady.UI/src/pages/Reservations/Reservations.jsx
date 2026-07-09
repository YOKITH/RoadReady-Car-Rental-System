import { useEffect, useState } from "react";

import { getReservationsByUser } from "../../api/reservationApi";
import { useAuth } from "../../context/AuthContext";

import ReservationList from "../../components/ReservationList/ReservationList";

import fleetBg from "../../Images/fleet-bg.png";

import "./Reservations.css";

function Reservations() {

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

            setLoading(true);

            const data = await getReservationsByUser(user.userId);

            console.log("Reservations:", data);

            const activeReservations = data.filter(
                reservation =>
                    reservation.status?.toLowerCase() !== "cancelled"
            );

            setReservations(activeReservations);

        }
        catch (error) {

            setError(error.message);

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <div
            className="reservations-page"
            style={{
                backgroundImage: `
                    linear-gradient(
                        rgba(15,23,42,0.65),
                        rgba(15,23,42,0.65)
                    ),
                    url(${fleetBg})
                `
            }}
        >

            <div className="reservations-header">

                <h1>
                    My Reservations
                </h1>

                <p>
                    View and manage your booked vehicles.
                </p>

            </div>

            {
                loading &&

                <div className="loading">
                    Loading reservations...
                </div>
            }

            {
                error &&

                <div className="error">
                    {error}
                </div>
            }

            {
                !loading && !error &&

                <ReservationList
                    reservations={reservations}
                    refreshReservations={loadReservations}
                />
            }

        </div>

    );

}

export default Reservations;