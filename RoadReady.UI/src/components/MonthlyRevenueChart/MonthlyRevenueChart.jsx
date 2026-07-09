import "./MonthlyRevenueChart.css";

function MonthlyRevenueChart({ data }) {

    if (!data || data.length === 0) {

        return (

            <div className="monthly-revenue-chart">

                <h2>

                    Monthly Revenue

                </h2>

                <p>

                    No monthly revenue data available.

                </p>

            </div>

        );

    }

    return (

        <div className="monthly-revenue-chart">

            <h2>

                Monthly Revenue

            </h2>

            <div className="monthly-revenue-table-container">

                <table className="monthly-revenue-table">

                    <thead>

                        <tr>

                            <th>Month</th>

                            <th>Revenue</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            data.map((item, index) => (

                                <tr key={index}>

                                    <td>

                                        {item.month}

                                    </td>

                                    <td>

                                        ₹{item.revenue}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default MonthlyRevenueChart;