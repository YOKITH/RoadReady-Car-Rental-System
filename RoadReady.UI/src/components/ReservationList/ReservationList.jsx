import { useState } from "react";

import ReservationCard from "../ReservationCard/ReservationCard";
import CancelReservationModal from "../CancelReservationModal/CancelReservationModal";

import "./ReservationList.css";

function ReservationList({
    reservations,
    refreshReservations
}) {

    const [selectedReservationId, setSelectedReservationId] =
        useState(null);

    const [showModal, setShowModal] = useState(false);

    function handleCancelClick(reservationId) {

        setSelectedReservationId(reservationId);

        setShowModal(true);

    }

    function handleCloseModal() {

        setSelectedReservationId(null);

        setShowModal(false);

    }

    function handleReservationCancelled() {

        handleCloseModal();

        refreshReservations();

    }

    if (reservations.length === 0) {

        return (

            <div className="empty-reservations">

                <h2>

                    No Reservations Found

                </h2>

                <p>

                    You haven't booked any cars yet.

                </p>

            </div>

        );

    }

    return (

        <>

            <div className="reservation-list">

                {

                    reservations.map((reservation) => (

                        <ReservationCard
                            key={reservation.reservationId}
                            reservation={reservation}
                            onCancel={handleCancelClick}
                        />

                    ))

                }

            </div>

            {

                showModal &&

                <CancelReservationModal

                    reservationId={selectedReservationId}

                    onClose={handleCloseModal}

                    onCancelled={handleReservationCancelled}

                />

            }

        </>

    );

}

export default ReservationList;