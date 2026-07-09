import { Link } from "react-router-dom";

import "./PaymentSuccess.css";

function PaymentSuccess() {

    return (

        <div className="payment-success">

            <div className="success-icon"> ✓ </div>

            <h2> Payment Successful! </h2>

            <p> Your payment has been verified successfully. </p>

            <p> Your reservation has been confirmed. </p>

            <div className="success-buttons">

                <Link to="/reservations" className="primary-button" >
                View Reservations </Link>

                <Link to="/home" className="secondary-button"> Back to Home </Link>

            </div>
        </div>
    );
}
export default PaymentSuccess;