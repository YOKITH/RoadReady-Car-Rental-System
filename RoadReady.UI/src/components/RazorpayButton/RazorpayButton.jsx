import { createOrder, verifyPayment } from "../../api/paymentApi";
import "./RazorpayButton.css";

function RazorpayButton({ reservation, onPaymentSuccess }) {
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);

            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        try {
            const loaded = await loadRazorpayScript();

            if (!loaded) {
                alert("Unable to load Razorpay.");
                return;
            }

            const order = await createOrder(
                reservation.reservationId
            );

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: order.amount,
                currency: order.currency,
                name: "RoadReady",
                description: "Car Rental Payment",
                order_id: order.orderId,
                handler: async (response) => {
                    try {
                        const verifyRequest = {
                            reservationId:
                                reservation.reservationId,
                            razorpayOrderId:
                                response.razorpay_order_id,
                            razorpayPaymentId:
                                response.razorpay_payment_id,
                            razorpaySignature:
                                response.razorpay_signature,
                        };

                        console.log(
                            "Verify Request:",
                            verifyRequest
                        );

                        await verifyPayment(verifyRequest);

                        alert("✅ Payment Successful");

                        if (onPaymentSuccess) {
                            onPaymentSuccess();
                        }
                    } catch (error) {
                        console.error(error);
                        alert(error.message);
                    }
                },
                prefill: {
                    name: reservation.customerName || "",
                    email: reservation.email || "",
                    contact: reservation.phoneNumber || "",
                },
                theme: {
                    color: "#2563eb",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="razorpay-container">
            <button
                className="razorpay-button"
                onClick={handlePayment}
            >
                Pay ₹{reservation.totalAmount}
            </button>
        </div>
    );
}

export default RazorpayButton;