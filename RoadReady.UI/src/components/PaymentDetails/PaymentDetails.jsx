import "./PaymentDetails.css";

function PaymentDetails({ payment, onClose }) {
  if (!payment) return null;

  return (
    <div className="payment-details-overlay">
      <div className="payment-details-container">
        <h2>Payment Details</h2>

        {payment.paymentStatus?.toLowerCase() === "completed" && (
          <div className="payment-success-message">
            ✅ Payment Completed Successfully!
          </div>
        )}

        <div className="payment-info">
          <div className="info-item">
            <strong>Payment ID</strong>
            <span>{payment.paymentId}</span>
          </div>

          <div className="info-item">
            <strong>Reservation ID</strong>
            <span>{payment.reservationId}</span>
          </div>

          <div className="info-item">
            <strong>Customer</strong>
            <span>{payment.userId}</span>
          </div>

          <div className="info-item">
            <strong>Amount</strong>
            <span>₹{payment.amount}</span>
          </div>

          <div className="info-item">
            <strong>Payment Method</strong>
            <span>Razorpay</span>
          </div>

          <div className="info-item">
            <strong>Payment Date</strong>
            <span>{new Date(payment.paymentDate).toLocaleDateString()}</span>
          </div>

          {/* <div className="info-item">
            <strong>Payment Status</strong>
            <span className={`status ${payment.paymentStatus.toLowerCase()}`}>
              {payment.paymentStatus}
            </span>
          </div> */}

          <div className="info-item">
            <strong>Razorpay Payment ID</strong>
            <span>{payment.razorpayPaymentId}</span>
          </div>
        </div>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default PaymentDetails;