import { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

import PaymentSummary from "../../components/PaymentSummary/PaymentSummary";
import RazorpayButton from "../../components/RazorpayButton/RazorpayButton";
import PaymentSuccess from "../../components/PaymentSuccess/PaymentSuccess";

import fleetBg from "../../Images/fleet-bg.png";

import "./MakePayment.css";

function MakePayment() {

    const location = useLocation();

    const navigate = useNavigate();

    const [reservation, setReservation] = useState(
        location.state?.reservation
    );

    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(() => {

        window.scrollTo(0, 0);

    }, []);

    if (!reservation) {

        return (
            <Navigate
                to="/payments"
                replace
            />
        );

    }

    function handlePaymentSuccess() {

        setReservation(previousReservation => ({
            ...previousReservation,
            status: "Confirmed"
        }));

        setPaymentSuccess(true);

    }

    function handlePayLater() {

        navigate("/reservations");

    }

    return (

        <div
            className="make-payment-page"
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

            <div className="make-payment-container">

                <h1 className="make-payment-title">

                    Make Payment

                </h1>

                <PaymentSummary
                    reservation={reservation}
                />

                {

                    paymentSuccess ? (

                        <PaymentSuccess />

                    ) : (

                        <div className="payment-actions">

                            <div className="payment-btn">

                                <RazorpayButton
                                    reservation={reservation}
                                    onPaymentSuccess={handlePaymentSuccess}
                                />

                            </div>

                            <button
                                className="pay-later-btn"
                                onClick={handlePayLater}
                            >
                                Pay Later
                            </button>

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default MakePayment;