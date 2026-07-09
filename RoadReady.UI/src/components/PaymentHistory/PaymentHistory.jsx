import { useEffect, useState } from "react";

import { getPaymentsByUser } from "../../api/paymentApi";
import { useAuth } from "../../context/AuthContext";

import "./PaymentHistory.css";

function PaymentHistory() {
    const { user } = useAuth();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    console.log(payments);

    useEffect(() => {
        loadPayments();
    }, []);
    async function loadPayments() {
        try {
            const data = await getPaymentsByUser(user.userId);
            setPayments(data);
        }
        catch (error) {
            setError(error.message);
        }

        finally {
            setLoading(false);
        }
    }
    if (loading) {
        return (
            <div className="payment-history">
                <h2>Payment History</h2>
                <p>Loading payments...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="payment-history">
                <h2>Payment History</h2>
                <p className="error">{error}</p>
            </div>
        );
    }
    return (
        <div className="payment-history">
            <h2>
                Payment History
            </h2>
            {
                payments.length === 0
                    ?
                    (
                        <div className="empty-history"> No payment history available. </div>
                    )
                    :
                    (
                    <table>
                        <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Reservation</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((payment) => (
                                    <tr key={payment.paymentId}>
                                        
                                        <td> {payment.paymentId} </td>
                                        <td> {payment.reservationId} </td>
                                        <td> ₹{payment.amount} </td>
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
                                            {
                                                new Date(
                                                    payment.paymentDate
                                                ).toLocaleDateString()
                                            }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
            }
        </div>
    );
}
export default PaymentHistory;