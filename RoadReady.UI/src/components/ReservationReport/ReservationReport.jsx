import ReportCard from "../ReportCard/ReportCard";

import "./ReservationReport.css";

function ReservationReport({ report }) {

    if (!report) {

        return (

            <div className="reservation-report">

                <h2>

                    Reservation Report

                </h2>

                <p>

                    No reservation data available.

                </p>

            </div>

        );

    }

    return (

        <div className="reservation-report">

            <h2>

                Reservation Report

            </h2>

            <div className="reservation-grid">

                <ReportCard
                    title="Total Reservations"
                    value={report.totalReservations ?? 0}
                />

                <ReportCard
                    title="Confirmed"
                    value={report.confirmedReservations ?? 0}
                />

                <ReportCard
                    title="Pending"
                    value={report.pendingReservations ?? 0}
                />

                <ReportCard
                    title="Cancelled"
                    value={report.cancelledReservations ?? 0}
                />

            </div>

        </div>

    );

}

export default ReservationReport;