import { useState } from "react";

import { cancelReservation } from "../../api/reservationApi";

import "./CancelReservationModal.css";

function CancelReservationModal({reservationId,onClose,onCancelled})
 {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    async function handleConfirmCancel() {

        try {
            setLoading(true);
            setError("");
            await cancelReservation(reservationId);
            onCancelled();
        }

        catch (error) {
            setError(error.message);
        }

        finally {
            setLoading(false);
        }

    }

    return (

        <div className="modal-overlay">

            <div className="modal-container">

                <h2> Cancel Reservation </h2>

                <p> Are you sure you want to cancel this reservation? </p>

                <p className="warning"> This action cannot be undone. </p>
                {
                    error &&
                    <div className="error-message"> {error} </div>
                }

                <div className="modal-buttons">

                    <button className="cancel-btn" onClick={onClose} disabled={loading} >
                        No </button>

                    <button className="confirm-btn" onClick={handleConfirmCancel}
                        disabled={loading} >
                        {
                            loading ? "Cancelling..." : "Yes, Cancel"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
export default CancelReservationModal;