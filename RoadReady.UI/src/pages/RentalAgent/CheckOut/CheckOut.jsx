import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./CheckOut.css";

import CheckOutTable from "../../../components/CheckOut/CheckOutTable";
import CheckOutForm from "../../../components/CheckOut/CheckOutForm";

import { getAllCheckOuts } from "../../../api/checkOutApi";

const CheckOut = () => {

    const location = useLocation();

    const reservation = location.state?.reservation;

    // Replace with logged-in Rental Agent ID
    const rentalAgentId = 1;

    const [checkOuts, setCheckOuts] = useState([]);

    const [showForm, setShowForm] = useState(
        reservation ? true : false
    );

    const [loading, setLoading] = useState(true);

    // ======================================
    // Load Check-Out Records
    // ======================================

    const loadCheckOuts = async () => {

        try {

            setLoading(true);

            const response = await getAllCheckOuts();

            setCheckOuts(response);

        }
        catch (error) {

            console.error(error);

            alert("Unable to load check-out records.");

        }
        finally {

            setLoading(false);

        }

    };

    // ======================================
    // Initial Load
    // ======================================

    useEffect(() => {

        loadCheckOuts();

    }, []);

    // ======================================
    // After Successful Check-Out
    // ======================================

    const handleSuccess = () => {

        setShowForm(false);

        loadCheckOuts();

    };

    // ======================================
    // Cancel Form
    // ======================================

    const handleCancel = () => {

        setShowForm(false);

    };

    if (loading) {

        return (

            <div className="checkout-loading">

                <h2>Loading Check-Out Records...</h2>

            </div>

        );

    }

    return (

        <div className="checkout-page">

            {/* ====================================== */}
            {/* Header */}
            {/* ====================================== */}

            <div className="page-header">

                <div>

                    <h1>Vehicle Check-Out</h1>

                    <p>
                        Manage returned vehicles and completed check-outs.
                    </p>

                </div>

                {/* <button className="refresh-btn" onClick={loadCheckOuts}>
                    Refresh
                </button> */}

            </div>

            {/* ====================================== */}
            {/* Check-Out Form */}
            {/* ====================================== */}

            {

                showForm && reservation && (

                    <CheckOutForm

                        reservation={reservation}

                        rentalAgentId={rentalAgentId}

                        onSuccess={handleSuccess}

                        onCancel={handleCancel}

                    />

                )

            }

            {/* ====================================== */}
            {/* Check-Out Table */}
            {/* ====================================== */}

            <CheckOutTable

                checkOuts={checkOuts}

            />

        </div>

    );

};

export default CheckOut;