import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./CheckIn.css";

import CheckInTable from "../../../components/CheckIn/CheckInTable";
import CheckInForm from "../../../components/CheckIn/CheckInForm";

import { getAllCheckIns } from "../../../api/checkInApi";

const CheckIn = () => {

    const location = useLocation();

    const reservation = location.state?.reservation;

    // Replace with logged-in Rental Agent ID later
    const rentalAgentId = 1;

    const [checkIns, setCheckIns] = useState([]);

    const [showPopup, setShowPopup] = useState(!!reservation);

    const [loading, setLoading] = useState(true);

    // ======================================
    // Load Check-Ins
    // ======================================

    const loadCheckIns = async () => {

        try {

            setLoading(true);

            const response = await getAllCheckIns();

            setCheckIns(response);

        }
        catch (error) {

            console.error(error);

            alert("Unable to load check-in records.");

        }
        finally {

            setLoading(false);

        }

    };

    // ======================================
    // Initial Load
    // ======================================

    useEffect(() => {

        loadCheckIns();

    }, []);

    // ======================================
    // Open Popup if Reservation Exists
    // ======================================

    useEffect(() => {

        if (reservation) {

            setShowPopup(true);

        }

    }, [reservation]);

    // ======================================
    // Prevent Background Scroll
    // ======================================

    useEffect(() => {

        if (showPopup) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "auto";

        }

        return () => {

            document.body.style.overflow = "auto";

        };

    }, [showPopup]);

    // ======================================
    // Success
    // ======================================

    const handleSuccess = () => {

        setShowPopup(false);

        loadCheckIns();

    };

    // ======================================
    // Cancel
    // ======================================

    const handleCancel = () => {

        setShowPopup(false);

    };

    if (loading) {

        return (

            <div className="checkin-loading">

                <h2>Loading Check-In Records...</h2>

            </div>

        );

    }

    return (

        <div className="checkin-page">

            <div className="page-header">

                <h1>Vehicle Check-In</h1>

                {/* <button
                    className="refresh-btn"
                    onClick={loadCheckIns}
                >
                    Refresh
                </button> */}

            </div>

            <CheckInTable
                checkIns={checkIns}
            />

            {/* Popup */}

            {

                showPopup && reservation && (

                    <div
                        className="vehicle-checkin-overlay-new"
                        onClick={handleCancel}
                    >

                        <div
                            className="vehicle-checkin-popup-new"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <CheckInForm
                                reservation={reservation}
                                rentalAgentId={rentalAgentId}
                                onSuccess={handleSuccess}
                                onCancel={handleCancel}
                            />

                        </div>

                    </div>

                )

            }

        </div>

    );

};

export default CheckIn;