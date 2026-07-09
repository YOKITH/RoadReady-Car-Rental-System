import ReportCard from "../ReportCard/ReportCard";

import "./RevenueReport.css";

function RevenueReport({ revenue }) {

    if (!revenue) {

        return (

            <div className="revenue-report">

                <h2>

                    Revenue Report

                </h2>

                <p>

                    No revenue data available.

                </p>

            </div>

        );

    }

    return (

        <div className="revenue-report">

            <h2>

                Revenue Report

            </h2>

            <div className="revenue-grid">

                <ReportCard
                    title="Total Revenue"
                    value={`₹${revenue.totalRevenue ?? 0}`}
                />

                <ReportCard
                    title="Today's Revenue"
                    value={`₹${revenue.todayRevenue ?? 0}`}
                />

                <ReportCard
                    title="Monthly Revenue"
                    value={`₹${revenue.monthlyRevenue ?? 0}`}
                />

                <ReportCard
                    title="Yearly Revenue"
                    value={`₹${revenue.yearlyRevenue ?? 0}`}
                />

            </div>

        </div>

    );

}

export default RevenueReport;