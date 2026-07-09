import { useEffect, useState } from "react";

import { getAllReservations } from "../../api/reservationApi";

import ReservationTable from "../../components/ReservationTable/ReservationTable";
import ReservationDetails from "../../components/ReservationDetails/ReservationDetails";
//import ReservationStatus from "../../components/ReservationStatus/ReservationStatus";

import "./ManageReservations.css";

function ManageReservations() {

    const [reservations, setReservations] = useState([]);

    const [selectedReservation, setSelectedReservation] = useState(null);

    const [showDetails, setShowDetails] = useState(false);

    //const [showStatus, setShowStatus] = useState(false);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadReservations();

    }, []);

    async function loadReservations() {

        try {

            setLoading(true);

            const response = await getAllReservations();

            setReservations(response);

        }

        catch (error) {

            setError(error.message);

        }

        finally {

            setLoading(false);

        }

    }

    function handleView(reservation) {

        setSelectedReservation(reservation);

        setShowDetails(true);

    }

    // function handleStatus(reservation) {

    //     setSelectedReservation(reservation);

    //     //setShowStatus(true);

    // }

    return (

        <div className="manage-reservations-page">

            <div className="manage-reservations-header">

                <h1>

                    Current Reservations

                </h1>

            </div>

            {

                loading

                    ?

                    <p>

                        Loading reservations...

                    </p>

                    :

                    error

                        ?

                        <p className="error">

                            {error}

                        </p>

                        :

                        <ReservationTable

                            reservations={reservations}

                            onView={handleView}

                            

                        />

            }

            {

                showDetails &&

                <ReservationDetails

                    reservation={selectedReservation}

                    onClose={() => setShowDetails(false)}

                />

            }

        </div>

    );

}

export default ManageReservations;