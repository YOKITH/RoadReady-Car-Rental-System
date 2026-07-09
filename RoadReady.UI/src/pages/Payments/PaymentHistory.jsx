import { useEffect } from "react";

import PaymentHistory from "../../components/PaymentHistory/PaymentHistory";

import fleetBg from "../../Images/fleet-bg.png";

import "./PaymentHistory.css";

function PaymentHistoryPage() {

    useEffect(() => {

        window.scrollTo(0, 0);

    }, []);

    return (

        <div
            className="payment-history-page"
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

            <div className="payment-history-container">

                <h1 className="payment-history-title">

                    Payment History

                </h1>

                <PaymentHistory />

            </div>

        </div>

    );

}

export default PaymentHistoryPage;