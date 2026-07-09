import "./PaymentTable.css";

function PaymentTable({ payments, onView }) {
    console.log("Payments:", payments);

    if (payments.length === 0) {
        return (
            <div className="empty-payments">
                No payments found.
            </div>
        );
    }

    return (
        <div className="payment-table-container">
            <table className="payment-table">
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Reservation</th>
                        <th>Customer ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Payment Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.paymentId}>
                            <td>{payment.paymentId}</td>

                            <td>{payment.reservationId}</td>

                            <td>{payment.user.userId}</td>

                            <td>₹{payment.amount}</td>

                            <td>
                                <span
                                    className={`payment-status ${
                                        payment.paymentStatus
                                            ?.toLowerCase()
                                            .replace(/\s+/g, "-") || "default"
                                    }`}
                                >
                                    {payment.paymentStatus}
                                </span>
                            </td>

                            <td>
                                {new Date(
                                    payment.paymentDate
                                ).toLocaleDateString()}
                            </td>

                            <td>
                                <button
                                    className="view-btn"
                                    onClick={() => onView(payment)}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentTable;