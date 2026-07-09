import { useEffect, useState } from "react";

import PaymentTable from "../../components/PaymentTable/PaymentTable";
import PaymentDetails from "../../components/PaymentDetails/PaymentDetails";
import PaymentFilter from "../../components/PaymentFilter/PaymentFilter";

import { getAllPayments } from "../../api/paymentApi";

import "./ShowPayments.css";

function ShowPayments() {

    const [payments, setPayments] = useState([]);

    const [allPayments, setAllPayments] = useState([]);

    const [selectedPayment, setSelectedPayment] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadPayments();

    }, []);

    async function loadPayments() {

        try {

            setLoading(true);

            const data = await getAllPayments();

            // Sort by newest first initially
            const sortedPayments = [...data].sort(
                (a, b) =>
                    new Date(b.paymentDate) - new Date(a.paymentDate)
            );

            setPayments(sortedPayments);

            setAllPayments(sortedPayments);

        }

        catch (err) {

            setError(err.message);

        }

        finally {

            setLoading(false);

        }

    }

    function handleFilter(sortOrder) {

        const sortedPayments = [...allPayments];

        if (sortOrder === "Newest") {

            sortedPayments.sort(
                (a, b) =>
                    new Date(b.paymentDate) - new Date(a.paymentDate)
            );

        }

        else if (sortOrder === "Oldest") {

            sortedPayments.sort(
                (a, b) =>
                    new Date(a.paymentDate) - new Date(b.paymentDate)
            );

        }

        setPayments(sortedPayments);

    }

    return (

        <div className="show-payments">

            <div className="show-payments-header">

                <h1>

                    Show Payments

                </h1>

            </div>

            <PaymentFilter

                onFilter={handleFilter}

            />

            {

                loading ?

                    <p>Loading payments...</p>

                    :

                    error ?

                        <p>{error}</p>

                        :

                        <PaymentTable

                            payments={payments}

                            onView={setSelectedPayment}

                        />

            }

            {

                selectedPayment && (

                    <PaymentDetails

                        payment={selectedPayment}

                        onClose={() => setSelectedPayment(null)}

                    />

                )

            }

        </div>

    );

}

export default ShowPayments;